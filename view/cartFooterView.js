/*globals define*/
define([
    'jquery',
    'exports',
    'underscore',
    'marionette',
    'handlebar',
    '../app'
], function (
    $,
    exports,
    _,
    Marionette,
    Handlebar,
    App
) {
    'use strict';
    var totalCost = 0;
    exports.CartFooterView = Marionette.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            this.calculateTotalCost();
            var theTemplateScript = $("#cartFooter-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var finalCost = {cartTotalCost: totalCost};
            var theCompiledTemplate = theTemplate(finalCost);
            $(this.el).html(theCompiledTemplate);
            return this;
        },
        calculateTotalCost: function () {
            totalCost = 0;
            _.each(this.collection.models, function (object) {
                totalCost += object.attributes.finalCost;
            });
        },
        events: {
            'click #buyNow': 'buyNow',
            'click #continueShopping': 'continueShopping'
        },

        buyNow: function () {
            App.router.navigate('shippingDetail', {trigger: true});

        },
        continueShopping: function () {
            App.router.navigate('home', {trigger: true});
        }
    });
});