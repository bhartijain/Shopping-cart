/*globals define */
define([
    'exports',
    'backbone',
    'view/startView',
    'view/mainLayout',
    'view/homeView',
    'view/headerView',
    'model/productModel',
    'collection/productsCollection'
], function (
    exports,
    Backbone,
    Start,
    Mainlayout,
    Home,
    Header,
    ProductModel,
    ProductsCollection
) {
    'use strict';
    exports.Router = Backbone.Router.extend({
        routes: {
            "": "start",
            home: "home"
        },
        start: function () {
            Mainlayout.layout.showChildView('body', new Start.StartView());
            console.log('in route');
        },
        home: function () {
            var bodyRegion = Mainlayout.layout.getRegion('body');
            bodyRegion.empty();
            Mainlayout.layout.showChildView('header', new Header.HeaderView());
            Mainlayout.layout.showChildView('body', new Home.HomeCollectionView({model: new ProductModel.Product(), collection: ProductsCollection.allProducts}));
        }
    });

});