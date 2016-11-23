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
    exports.StartView = Marionette.View.extend({
        events: {
            'click #startBtn': 'startButton'
        },
        render: function () {
            console.log("in start");
            var theTemplateScript = $("#start-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            $(this.el).html(theTemplate);
        },
        startButton: function () {
            App.router.navigate("home", {trigger: true});
        }
    });

});