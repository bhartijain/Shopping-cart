/*globals define */
define([
    'exports',
    'backbone',
    'view/startView',
    'view/mainLayout'
], function (
    exports,
    Backbone,
    Start,
    Mainlayout
) {
    'use strict';
    exports.Router = Backbone.Router.extend({
        routes: {
            "": "start"
        },

        start: function () {
            Mainlayout.layout.showChildView('header', new Start.StartView());
            console.log('in route');
        }
    });

});