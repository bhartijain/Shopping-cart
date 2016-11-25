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
    var CartChildView = Marionette.View.extend({
        initialize: function () {
            cost = this.model.attributes.cost;
        },
        tagName: 'tr',
        render: function () {
            var data = this.model.attributes;
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(data);
            $(this.el).html(theCompiledTemplate);
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
                this.model.attributes.finalQuantity = quantity;
                this.model.attributes.finalCost = cost * quantity;
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
            childView.model.attributes.finalCost= childView.model.attributes.cost;
            childView.model.attributes.finalQuantity= childView.model.attributes.quantity;
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