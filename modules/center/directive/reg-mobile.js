/**
 * Created by wyunfei on 2017/4/23.
 */

'use strict';
var reg = angular.module('cx.center');

reg.directive('regMobile', function () {
    return {
        restrict: 'A',
        controller: function ($scope, API) {

            $scope.imgCodeUrl = '';
            $scope.imgCodeShow = false;

            $scope.invalidMobile = function (isSelect) {
                var templateNo = '';
                console.log(isSelect);
                if (!$scope.nForm.nText.$valid) {
                    $scope.user.invalidInfo = '手机号不能为空';
                    return;
                }
                if (!(/^1(3|4|5|7|8)\d{9}$/.test($scope.user.mobile))) {
                    $scope.user.invalidInfo = '请正确填写手机号';
                    return;
                }
                $scope.user.invalidInfo = '';

                isSelect === 'isRegister' ? templateNo = '10216' : templateNo = '10217';
                $scope.imgCodeUrl = API + 'app/message/picCode.htm?mobile=' + $scope.user.mobile + '&templateNo=' + templateNo;
                $scope.imgCodeShow = true;

            };
        }
    };
});
