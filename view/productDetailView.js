/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    '../app'
], function (
    $,
    exports,
    Marionette,
    Handlebar,
    App
) {
    'use strict';
    exports.ProductDetailView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#productDetail-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledTemplate);
        },
        events: {
            'click .addToCart': 'addToCart'
        },
        addToCart: function (e) {
            var id = e.target.id;
            id = parseInt(id);
            App.router.navigate('cart/' + id, {trigger: true});
        }

    });
});