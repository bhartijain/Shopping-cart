/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar'
], function (
    $,
    exports,
    Marionette,
    Handlebar
) {
    'use strict';
    var HomeView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#home-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledHtml = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledHtml);
        }
    });
    exports.HomeCollectionView = Marionette.CollectionView.extend({
        childView: HomeView

    });
});