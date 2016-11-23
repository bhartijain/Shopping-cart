/*globals define */
define([
    'exports',
    'backbone'
], function (
    exports,
    Backbone
) {
    'use strict';
    exports.Router = Backbone.Router.extend({
        routes: {
            "": "start"
        },

        start: function () {
            console.log('in route');
        }
    });

});