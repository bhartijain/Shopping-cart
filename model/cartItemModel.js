/*globals define*/
define([
    'exports',
    'backbone'
], function (
    exports,
    Backbone
) {
    'use strict';
    exports.CartItem = Backbone.Model.extend({
        defaults: {
            id: '',
            product: '',
            cost: '',
            quantity: '',
            finalCost:'',
            finalQuantity:''
        }
    });
});