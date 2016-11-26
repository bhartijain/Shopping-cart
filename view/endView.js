/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    '../app',
    '../collection/userDetailCollection',
    '../collection/cartItemCollection'

], function (
    $,
    exports,
    Marionette,
    Handlebar,
    App,
    UserDetailCollection,
    CartItemCollection
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