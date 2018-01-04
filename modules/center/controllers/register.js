/**
 * Created by wyunfei on 2017/4/17.
 */
'use strict';
var Register = angular.module('cx.center');
Register.controller('Register', function ($scope, $cookieStore, $http, getCodeApi, registerApi, regMobileApi, wxBind, $state, getSmsCode, inputClear, regEffect) {



    $scope.user = {
        mobile: '',
        smsCode: '',
        password: '',
        imgCode: '',
        isSubmitCommitment: true,
        invalidInfo: ''
    };


    $scope.Register = function () {


        //点击input清空，验证处理
        if(inputClear.regBol && inputClear.username) {
            $scope.user.mobile = '';
            $scope.user.invalidInfo = '手机号不能为空';
            return;
        }

        if(inputClear.regBol && inputClear.password) {
            $scope.user.password = '';
            $scope.user.invalidInfo = '密码不能为空';
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

        if (!$scope.nForm.nCode.$valid) {
            $scope.user.invalidInfo = '验证码不能为空';
            return;
        }

        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test($scope.user.password))) {
            $scope.user.invalidInfo = '6-18位数字与字母组合密码';
            return;
        }

        registerApi.register($scope.user.isSubmitCommitment, $scope.user.password, $scope.user.smsCode, $scope.user.mobile).then(function (response) {
            console.log(response);
            var obj = response.data;
            if (obj.header.errorCode !== '200') {
                $scope.user.invalidInfo = obj.header.errorMsg;
            } else {
                $state.go('registerSuc');
            }

            //微信绑定
            wxBind.bind(obj.body.token, $cookieStore.get('openid')).then(function (response) {
                console.log(response);
            });

        });

    };

    inputClear.clear(); //显示/隐藏/清空 密码
    regEffect.effect(); //表单线条效果

});
