/*globals define*/
define([
    'exports',
    'backbone'
], function (
    exports,
    Backbone
) {
    'use strict';
    exports.Product = Backbone.Model.extend({
        defaults: {
            id: '',
            product: '',
            cost: '',
            quantity: '',
            specification: ''
        }
    });
});