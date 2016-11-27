/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    'view/mainLayout',
    '../collection/productsCollection',
    '../app'
], function (
    $,
    exports,
    Marionette,
    Handlebar,
    Mainlayout,
    ProductsCollection,
    App
) {
    'use strict';
    var cost = 0, finalCost;
    var totalCost = 0;
    var CartChildView = Marionette.View.extend({
        tagName: 'tr',
        render: function () {
            var data = this.model.attributes;
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(data);
            $(this.el).html(theCompiledTemplate);
        },
        events: {
            'mouseup .itemQuantityChange': 'itemQuantityChange'
        },
        triggers: {
            'click .removeCartItem': 'remove:cart:item'
        },

        itemQuantityChange: function (e) {
            var finalQuantity = $(e.target).val();
            if (finalQuantity) {
                this.model.attributes.finalCost = this.model.attributes.cost * finalQuantity;
                this.model.set('finalQuantity', finalQuantity);
            }
            this.render();
        }
    });

    var CartCollectionView = Marionette.CollectionView.extend({
        initialize: function () {
            this.calculateTotalCost();
            this.listenTo(this.model, "change", this.calculateTotalCost);
        },
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
            this.collection.remove(childView.model);
        },
        calculateTotalCost: function () {
            var data = this.collection.models;
            totalCost = 0;
            _.each(this.collection.models, function(object){
                    totalCost += object.attributes.finalCost;
            });
            console.log(totalCost);
            cartFooterView.render();
        }

    });

    var CartFooterView = Marionette.View.extend({
        render: function () {
            finalCost = {cartTotalCost : totalCost};
            var theTemplateScript = $("#cartFooter-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(finalCost);
            console.log(this.$el);
            $(this.el).html(theCompiledTemplate);
        },

        events: {
            'click #buyNow': 'buyNow',
            'click #continueShopping': 'continueShopping'
        },

        buyNow: function () {
            App.router.navigate('shippingDetail', {trigger: true});

        },
        continueShopping: function () {
            App.router.navigate('home', {trigger: true});
        }
    });
    var cartFooterView = new CartFooterView();

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