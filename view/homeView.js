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
    var HomeView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#home-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledHtml = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledHtml);
        },
        events: {
            'click .product': 'productDetail'
        },
        productDetail: function (e) {
            var id = e.target.id;
            id = parseInt(id);
            App.router.navigate('productDetail/' + id, {trigger: true});
        }
    });
    exports.HomeCollectionView = Marionette.CollectionView.extend({
        childView: HomeView

    });
});