/**
 * Created by wyunfei on 2017/4/23.
 */

'use strict';
var reg = angular.module('cx.center');
var $ = require('jquery');
reg.directive('regImg', function () {
    return {
        restrict: 'A',
        controller: function ($scope, API) {

            $scope.reloadImgCode = function (isSelect) {
                var templateNo = '';
                isSelect === 'isRegister' ? templateNo = '10216' : templateNo = '10217';
                $('.code img').attr('src', API + 'app/message/picCode.htm?mobile=' + $scope.user.mobile + '&templateNo=' + templateNo + '&random=' + Math.random());
            };

        }
    };
});
