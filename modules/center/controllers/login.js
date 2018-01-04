/**
 * Created by wyunfei on 2017/4/17.
 */
'use strict';
var Login = angular.module('cx.center');

Login.controller('Login', function ($scope, $cookieStore, $location, $http, LoginApi, wxBind, regMobileApi, $state, inputClear) {

    $scope.user = {
        mobile: '',
        passWord: '',
        invalidInfo: ''
    };


    //微信是否绑定
    if($location.search()['openid']) {
        $cookieStore.put('openid', $location.search()['openid']);   //存
        //console.log($cookieStore.get('openid'));
        $state.reload();

        /*
        wxBind.isBind($cookieStore.get('openid')).then(function (response) {
            console.log(response);
            var obj = response.data;
            obj.body.flag === '1' ? $state.go('loginSuc') : '' ;
        });
        */

    }


    //登录
    $scope.login = function () {

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
        if (!$scope.nForm.nPassword.$valid) {
            $scope.user.invalidInfo = '密码不能为空';
            return;
        }
        $scope.user.invalidInfo = '';

        regMobileApi.checkUserName($scope.user.mobile).then(function (response) {
            console.log(response);
            var obj = response.data;
            if(obj.body.isRegister !== 'Y') {
                $scope.user.invalidInfo = '用户名不存在';
                return;
            }
        });

        LoginApi.login($scope.user.mobile, $scope.user.passWord).then(function (response) {

            console.log(response);
            var obj = response.data;
            obj.header.errorCode === '200' ? $state.go('loginSuc'): $scope.user.invalidInfo = obj.header.errorMsg;

            console.log($cookieStore.get('openid'));

            //微信绑定
            wxBind.bind(obj.body.token, $cookieStore.get('openid')).then(function (response) {
                console.log(response);
            });

        });


    };

    inputClear.clear(); //显示/隐藏/清空 密码





});