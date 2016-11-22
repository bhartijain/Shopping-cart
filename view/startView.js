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
		exports.StartView = Marionette.ItemView.extend({
			events : {
				'click #startBtn' : 'startButton'
			},

			render : function(){
				console.log("in start");
				var theTemplateScript = $("#start-template").html();
			  	var theTemplate = Handlebar.compile(theTemplateScript);
				 this.$el.html(theTemplate);
			},

			startButton : function(){
				App.router.navigate("home", {trigger : true });
			}
		});

	});