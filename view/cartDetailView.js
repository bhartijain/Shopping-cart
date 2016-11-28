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
            var data = this.model.attributes;
            data.finalCost = data.finalQuantity * data.cost;
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(data);
            $(this.el).html(theCompiledTemplate);
        },
        events: {
            'keypress .isNumber': 'isNumber',
            'keyup .itemQuantityChange': 'itemQuantityChange'

        },
        triggers: {
            'click .removeCartItem': 'remove:cart:item'
        },

        isNumber: function (e) {
            e = (e) ? e : window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
               return false;
            }
            return true;
        },

        itemQuantityChange: function (e) {
            var finalQuantity = $(e.target).val();
            if (finalQuantity) {
                this.model.attributes.finalCost = this.model.attributes.cost * finalQuantity;
                this.model.set('finalQuantity', finalQuantity);
                this.render();
            }  
        }
    });

    var CartCollectionView = Marionette.CollectionView.extend({
        childView: CartChildView,
        tagName: 'tbody',
        childViewEvents: {
            'remove:cart:item': 'removeCartItem'
        },
        removeCartItem: function (childView) {
            childView.model.attributes.finalCost = childView.model.attributes.cost;
            childView.model.attributes.finalQuantity = childView.model.attributes.quantity;
            ProductsCollection.allProducts.add(childView.model);
            this.removeChildView(childView);
            this.collection.remove(childView.model);
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
        }
    });
});