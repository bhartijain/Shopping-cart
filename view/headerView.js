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
    exports.HeaderView = Marionette.View.extend({
        events: {
            'click #homeBtn': 'homeButton'
        },

        render: function () {
            console.log("in header");
            var theTemplateScript = $("#header-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            $(this.el).html(theTemplate);
            this.startTime();
        },

        startTime: function () {
            var that = this;
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = this.checkTime(m);
            s = this.checkTime(s);
            $('#time').html(h + ":" + m + ":" + s);
            setTimeout(function () {
                that.startTime();
            }, 500);
        },

        checkTime: function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },


        homeButton: function () {
            App.router.navigate("home", {trigger: true});
        }
    });

});