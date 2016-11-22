define([
	'jquery',
	'exports',
	'underscore',
	'backbone',
	'./mainLayout',
	'view/startView',
	'view/headerView',
	'view/homeView'
		], function(
				$,
				exports,
				_,
				Backbone,
				MainLayout,
				Start,
				Header,
				Home
				){
		'use strict';
		exports.Router = Backbone.Router.extend({
			routes : {
				"": "start",
				"home": "home"
			},
		
			start : function(){
					MainLayout.layout.body.show(new Start.StartView());
			},

			home: function(){
				MainLayout.layout.body.empty();
				MainLayout.layout.header.show(new Header.HeaderView());
				MainLayout.layout.body.show(new Home.HomeView());
			}
	});

});