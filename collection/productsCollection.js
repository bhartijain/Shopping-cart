/*globals define*/
define([
    'exports',
    'backbone',
    '../model/productModel'
], function (
    exports,
    Backbone,
    ProductModel
) {
    'use strict';
    exports.Products = Backbone.Collection.extend({
        model: ProductModel.Product
    });
    exports.allProducts = new this.Products([
        {id: 1, product: "pen", cost: 20, specification: "blue color", quantity: 1},
        {id: 2, product: "shirt", cost: 200, specification: "peter england", quantity: 1}
    ]);
});