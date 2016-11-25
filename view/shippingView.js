/*globals define*/
define([
    'jquery',
    'exports',
    'backbone',
    'marionette',
    'handlebar',
    'view/mainLayout',
    '../model/userDetailModel',
    '../collection/userDetailsCollection',
    '../app'
], function (
    $,
    exports,
    Backbone,
    Marionette,
    Handlebar,
    Mainlayout,
    UserDetailModel,
    userDetailsCollection,
    App
) {
    'use strict';
    var name, phone, pincode, city, address;
    exports.ShippingView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#shipping-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate();
            $(this.el).html(theCompiledTemplate);            
        },
        events:{
            'click #submitUserDetail': 'submitUserDetail',
            'click #checkPincode': 'checkPincode'
        },

        checkPincode: function () {
                var pincode = $('#pincode').val();
             $.ajax({
                     url: 'http://maps.googleapis.com/maps/api/geocode/json?address= '+pincode + '',
                     type: 'GET',
                     dataType: 'json',
                     data: pincode,
                     success: function (obj) {
                        if(obj.status == "OK"){
                         var data = obj.results[0].address_components;
                         $('#city').val(data[1].long_name);
                         $('#address').val(data[2].long_name + ", " + data[3].long_name);
                     }
                     else
                     {
                        $('#city').val(" ");
                         $('#address').val(" ");
                        $('#addressMessage').html("There is no City exist on this pincode. Please check pincode again.");
                     }

                     }
                 });
 
        },

        submitUserDetail: function () {
            name = $('#userName').val();
            phone = $('#phone').val();
            pincode = $('#pincode').val();

            if(!name) {
                $('#nameMessage').html("Name is required");
                return false;
            }
            else {
                $('#nameMessage').html(" ");
            }
            
            if(phone == "") {
                $("#phoneMessage").html("Phone Number is required");
                return false;
            }
            else {
               $("#phoneMessage").html(" "); 
            }
            if(pincode == "") {
                $('#pincodeMessage').html("pincode is required");
                return false;
            }
            else {
                 $('#pincodeMessage').html(" ");
            }
            if(name && phone && pincode && city && address){
                 App.router.navigate('', {trigger: true});
            }

           var userDetail= new UserDetailModel.UserDetail();
           userDetail.set('name',name);
          
        }
    });
});