/**
 * Created by wyunfei on 2017/4/20.
 */
'use strict';
var center = angular.module('cx.center');
var $ = require('jquery');
center.factory('getSmsCode', function () {
        return {
            get: function () {
                var i = 60;
                var currentThis = $('.code .btn');
                var timer = null;

                currentThis.addClass('btnDisable').attr('disabled', 'disabled');
                currentThis.html(i + '`');
                timer = setInterval(function () {
                    i--;
                    currentThis.html(i + '`');
                    if (i === 0) {
                        clearInterval(timer);
                        currentThis.html('获取验证码');
                        currentThis.removeClass('btnDisable').removeAttr('disabled');
                        i = 60;
                    }
                }, 1000);
            }
        };
});
