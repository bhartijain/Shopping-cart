/*globals define*/
define([
    'exports',
    'backbone'
], function (
    exports,
    Backbone
) {
    'use strict';
    exports.UserDetail = Backbone.Model.extend({
        defaults: {
            name: '',
            phone: '',
            pincode: '',
            city: '',
            address: ''
        }
    });
});