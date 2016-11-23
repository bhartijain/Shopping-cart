/*globals define*/
define([
    'exports',
    'marionette'
], function (
    exports,
    Marionette
) {
    'use strict';
    var MainLayout = Marionette.View.extend({
        el: '#container',
        template: '#main-layout',
        regions: {
            header: "#header-region",
            body: "#body-region"
        }
    });
    exports.layout = new MainLayout();
});