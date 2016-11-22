requirejs.config({
  paths: {
    jquery: 'lib/jquery-3.1.1',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    marionette : 'lib/backbone.marionette.min',
    handlebar : 'lib/handlebars-v4.0.5'  
  }
});

require(['app']);