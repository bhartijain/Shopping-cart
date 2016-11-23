/*globals requirejs*/
requirejs.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        backboneRadio: 'lib/backbone.radio',
        marionette: 'lib/backbone.marionette.min',
        handlebar: 'lib/handlebars-v4.0.5'
    }
});

require(['app']);