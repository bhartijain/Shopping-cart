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
    var CartChildView = Marionette.View.extend({
        tagName: 'tr',
        render: function () {
            var theTemplateScript = $("#cartItem-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate(this.model.attributes);
            $(this.el).html(theCompiledTemplate);
        },

        events: {
            'click .removeCartItem': 'removeCartItem'
        },

        removeCartItem: function (e) {
            var id = e.target.id;
            id = parseInt(id);
        }
    });

    var CartCollectionView = Marionette.CollectionView.extend({
        childView: CartChildView,
        tagName: 'tbody'
    });

    exports.CartView = Marionette.View.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#cartTable-template',
        regions: {
            body: {
                el: 'tbody',
                replaceElement: true
            }
        },
        onRender() {
            this.showChildView('body', new CartCollectionView({collection: this.collection, model: this.model}));
        }
    });
});