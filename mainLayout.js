define([
	'jquery',
	'exports',
	'backbone',
	'marionette'	
	],function(
		$,
		exports,
		Backbone,
		Marionette
	){
		'use strict';
		var MainLayout = Marionette.LayoutView.extend({
			el : '#container',
			template : '#main-layout',
			regions: {
						header: "#header-region",
						body : "#body-region"
				}
		});

		exports.layout = new MainLayout();
});