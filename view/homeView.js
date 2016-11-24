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
    var HomeChildView = Marionette.View.extend({
        tagName: 'tr',
        render: function () {
            var theTemplateScript = $("#productRow-template").html();
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
    var HomeCollectionView = Marionette.CollectionView.extend({
        childView: HomeChildView,
        tagName: 'tbody'
    });

    exports.HomeView = Marionette.View.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#productTable-template',
        regions: {
            body: {
                el: 'tbody',
                replaceElement: true
            }
        },
        onRender() {
            this.showChildView('body', new HomeCollectionView({collection: this.collection, model: this.model}));
        }
    });
});