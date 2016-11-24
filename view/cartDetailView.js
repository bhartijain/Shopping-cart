/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    '../collection/productsCollection'
], function (
    $,
    exports,
    Marionette,
    Handlebar,
    ProductsCollection
) {
    'use strict';
    var CartChildView = Marionette.View.extend({
        tagName: 'tr',
        render: function () {
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledTemplate);
        },
        triggers: {
            'click .removeCartItem': 'remove:cart:item'
        },

        removeCartItem: function (e) {
            var id = e.target.id;
            id = parseInt(id);
        }
    });

    var CartCollectionView = Marionette.CollectionView.extend({
        initialize: function () {
            this.listenTo(this.model, 'click', this.render);
        },
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
        onRender() {
            this.showChildView('body', new CartCollectionView({collection: this.collection, model: this.model}));
        }
    });
});