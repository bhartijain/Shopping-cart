/*globals define*/
define([
    'exports',
    'backbone',
    '../model/userDetailModel'
], function (
    exports,
    Backbone,
    UserDetailModel
) {
    'use strict';
    exports.UserDetails = Backbone.Collection.extend({
        model: UserDetailModel.UserDetail
    });
    exports.allUserDetails = new this.UserDetails();
});