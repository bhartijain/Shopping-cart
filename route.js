/*globals define */
define([
    'exports',
    'backbone',
    'view/startView',
    'view/mainLayout',
    'view/homeView',
    'view/headerView',
    'view/productDetailView',
    'view/cartDetailView',
    'view/shippingView',
    'view/cartFooterView',
    'model/productModel',
    'model/cartItemModel',
    'collection/productsCollection',
    'collection/cartItemCollection'
], function (
    exports,
    Backbone,
    Start,
    Mainlayout,
    Home,
    Header,
    ProductDetail,
    CartDetail,
    ShippingDetail,
    CartFooter,
    ProductModel,
    CartItemModel,
    ProductsCollection,
    CartItemCollection
) {
    'use strict';
    exports.Router = Backbone.Router.extend({
        routes: {
            "": "start",
            home: "home",
            "productDetail/:id": "productDetail",
            "cart/:id": "cart",
            "shippingDetail": "shippingDetail"
        },
        start: function () {
            Mainlayout.layout.showChildView('body', new Start.StartView());
        },

        home: function () {
            var bodyRegion = Mainlayout.layout.getRegion('body');
            bodyRegion.empty();
            var footerRegion = Mainlayout.layout.getRegion('footer');
            footerRegion.empty();
            Mainlayout.layout.showChildView('header', new Header.HeaderView());
            Mainlayout.layout.showChildView('body', new Home.HomeView({model: new ProductModel.Product(), collection: ProductsCollection.allProducts}));
        },

        productDetail: function (id) {
            var footerRegion = Mainlayout.layout.getRegion('footer');
            footerRegion.empty();
            var model = new ProductModel.Product();
            var collection = ProductsCollection.allProducts;
            model.set(collection.get(id).toJSON());
            var bodyRegion = Mainlayout.layout.getRegion('body');
            bodyRegion.empty();
            Mainlayout.layout.showChildView('body', new ProductDetail.ProductDetailView({model: model, collection: collection}));
        },

        cart: function (id) {
            var data = ProductsCollection.allProducts.get(id).toJSON();
            var model = new CartItemModel.CartItem({id: data.id, product: data.product, cost: data.cost, quantity: data.quantity, finalCost: data.cost, finalQuantity: data.finalQuantity});
            CartItemCollection.allCartItems.add(model);
            var collection = CartItemCollection.allCartItems;
            ProductsCollection.allProducts.remove(data);
            var bodyRegion = Mainlayout.layout.getRegion('body');
            bodyRegion.empty();
            Mainlayout.layout.showChildView('body', new CartDetail.CartView({model: model, collection: collection}));
            Mainlayout.layout.showChildView('footer', new CartFooter.CartFooterView({model: model, collection: collection}));
        },

        shippingDetail: function () {
            var bodyRegion = Mainlayout.layout.getRegion('body');
            bodyRegion.empty();
            var footerRegion = Mainlayout.layout.getRegion('footer');
            footerRegion.empty();
            Mainlayout.layout.showChildView('header', new Header.HeaderView());
            Mainlayout.layout.showChildView('body', new ShippingDetail.ShippingView());
        }
    });

});