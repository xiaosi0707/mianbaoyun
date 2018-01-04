/**
 * Created by wyunfei on 2017/4/23.
 */
'use strict';
var reg = angular.module('cx.center');

reg.directive('regCode', function (regMobileApi, getCodeApi, inputClear, getSmsCode) {
    return {
        restrict: 'A',
        controller: function ($scope) {
            $scope.getCode = function (isSelect) {
                var templateNo = '';
                isSelect === 'isRegister' ? templateNo = '10216' : templateNo = '10217';
                console.log(isSelect);
                //点击input清空，验证处理
                if(inputClear.regBol) {
                    $scope.user.mobile = '';
                    $scope.user.invalidInfo = '手机号不能为空';
                    return;
                }
                if (!$scope.nForm.nText.$valid) {
                    $scope.user.invalidInfo = '手机号不能为空';
                    return;
                }
                if (!(/^1(3|4|5|7|8)\d{9}$/.test($scope.user.mobile))) {
                    $scope.user.invalidInfo = '请正确填写手机号';
                    return;
                }
                if (!$scope.nForm.nImgCode.$valid) {
                    $scope.user.invalidInfo = '请填写图形验证码';
                    return;
                }

                regMobileApi.checkUserName($scope.user.mobile).then(function (response) {
                    console.log(response);
                    var obj = response.data;
                    if (obj.body.isRegister === 'Y' && isSelect === 'isRegister') {
                        $scope.user.invalidInfo = '手机号已占用';
                        return;
                    }
                    if(obj.body.isRegister !== 'Y' && isSelect === 'isChange') {
                        $scope.user.invalidInfo = '用户名不存在';
                        return;
                    }

                    getCodeApi.getCode($scope.user.mobile, $scope.user.imgCode, templateNo).then(function (response) {
                        console.log(response);
                        var obj = response.data;
                        if (obj.header.errorCode !== '200') {
                            $scope.user.invalidInfo = '图形验证码错误';
                            return;
                        }
                        $scope.user.invalidInfo = '';
                        getSmsCode.get();   //倒计时效果
                    });
                });


            };
        }
    };
});