define([
	'jquery',
	'exports',
	'backbone',
	'marionette',
	'handlebar',
	'../app',
	],function($,
				exports,
				Backbone,
				Marionette,
				Handlebar,
				App
				){
		exports.HomeView = Marionette.ItemView.extend({
			render : function(){
				console.log("in start");
				var theTemplateScript = $("#home-template").html();
			  	var theTemplate = Handlebar.compile(theTemplateScript);
				 this.$el.html(theTemplate);
			}
		});

	});