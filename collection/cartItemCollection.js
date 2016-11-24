/*globals define*/
define([
    'exports',
    'backbone',
    '../model/cartItemModel'
], function (
    exports,
    Backbone,
    CartItemModel
) {
    'use strict';
    exports.CartItems = Backbone.Collection.extend({
        model: CartItemModel.CartItem
    });
    exports.allCartItems = new this.CartItems();
});