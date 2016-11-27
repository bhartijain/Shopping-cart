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
    exports.StartView = Marionette.View.extend({
        render: function () {
            console.log("in end");
            var theTemplateScript = $("#end-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            $(this.el).html(theTemplate);
        }
    });

});