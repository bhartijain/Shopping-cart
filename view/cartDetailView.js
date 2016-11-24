/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    'view/mainLayout',
    '../collection/productsCollection'
], function (
    $,
    exports,
    Marionette,
    Handlebar,
    Mainlayout,
    ProductsCollection
) {
    'use strict';
    var cost = 0;
    var totalCost = 0;
    var CartChildView = Marionette.View.extend({
        initialize: function () {
            cost = this.model.attributes.cost;
        },
        tagName: 'tr',
        render: function () {
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledTemplate);
             totalCost = cost * quantity;
        },
        events: {
            'focusout .itemQuantityChange': 'itemQuantityChange'
        },
        triggers: {
            'click .removeCartItem': 'remove:cart:item'
        },

        itemQuantityChange: function (e) {
            var quantity = $(e.target).val();
            if (quantity) {
                this.model.attributes.quantity = quantity;
                this.model.attributes.cost = cost * quantity;
            }
            this.render();
        }
    });

    var CartCollectionView = Marionette.CollectionView.extend({
        childView: CartChildView,
        tagName: 'tbody',
        childViewEvents: {
            'remove:cart:item': 'removeCartItem'
        },
        removeCartItem: function (childView) {
            ProductsCollection.allProducts.add(childView.model);
            this.removeChildView(childView);
        }
    });

    var CartFooterView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#cartFooter-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate();
            $(this.el).html(theCompiledTemplate);
        }
    });

    exports.CartView = Marionette.View.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#cartTable-template',
        regions: {
            body: {
                el: 'tbody',
                replaceElement: true
            }
        },
        onRender: function () {
            this.showChildView('body', new CartCollectionView({collection: this.collection, model: this.model}));
            Mainlayout.layout.showChildView('footer', new CartFooterView());
        }
    });
});