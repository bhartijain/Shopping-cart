/*globals define*/
define([
    'jquery',
    'exports',
    'marionette',
    'handlebar',
    '../model/userDetailModel',
    '../collection/productsCollection',
    '../collection/cartItemCollection',
    '../model/productModel',
    '../model/cartItemModel',
    '../app'
], function (
    $,
    exports,
    Marionette,
    Handlebar,
    UserDetailModel,
    ProductsCollection,
    CartItemCollection,
    ProductModel,
    CartItemModel,
    App
) {
    'use strict';
    var name, phone, pincode;
    exports.ShippingView = Marionette.View.extend({
        render: function () {
            var theTemplateScript = $("#shipping-template").html();
            var theTemplate = Handlebar.compile(theTemplateScript);
            var theCompiledTemplate = theTemplate();
            $(this.el).html(theCompiledTemplate);
        },
        events: {
            'click #submitUserDetail': 'submitUserDetail',
            'click #checkPincode': 'checkPincode'
        },
        checkPincode: function () {
            pincode = $('#pincode').val();
            $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?address= ' + pincode + '',
                type: 'GET',
                dataType: 'json',
                data: pincode,
                success: function (obj) {
                    if (obj.status === "OK") {
                        var data = obj.results[0].address_components;
                        $('#city').val(data[1].long_name);
                        $('#address').val(data[2].long_name + ", " + data[3].long_name);
                    } else {
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

            if (name) {
                $('#nameMessage').html(" ");
            } else {
                $('#nameMessage').html("Name is required");
                return false;
            }
            if (phone) {
                $("#phoneMessage").html(" ");
            } else {
                $("#phoneMessage").html("Phone Number is required");
                return false;
            }
            if (pincode) {
                $('#pincodeMessage').html(" ");
            } else {
                $('#pincodeMessage').html("pincode is required");
                return false;
            }
            if (name && phone && pincode) {
                var cartData = CartItemCollection.allCartItems;
                var productData = ProductsCollection.allProducts;
                productData.add(cartData.models);
                CartItemCollection.allCartItems.reset();
                console.log(CartItemCollection.allCartItems);
                App.router.navigate('home', {trigger: true});
            }

            var userDetail = new UserDetailModel.UserDetail();
            userDetail.set('name', name);
        }
    });
});