/**
 * Created by wyunfei on 2017/4/10.
 */

(function () {
    'use strict';
    //模块依赖
    var cx = angular.module('cx', [
        'cx.index',
        'cx.center',
        'cx.common',
        'ui.router',
        'ngCookies'
    ]);
    //一级路由
    cx.config(function ($stateProvider, $urlRouterProvider) {
        var base = './';
        $stateProvider.state('cx', {
            url: '/login',
            templateUrl: base + 'modules/center/templates/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: base + 'modules/center/templates/register.html'
        })
        .state('changePwd', {
            url: '/changePwd',
            templateUrl: base + 'modules/center/templates/change-pwd.html'
        })
        .state('registerSuc', {
            url: '/registerSuc',
            templateUrl: base + 'modules/center/templates/register-suc.html'
        })
        .state('loginSuc', {
            url: '/loginSuc',
            templateUrl: base + 'modules/center/templates/login-suc.html'
        })
        .state('changePwdSuc', {
            url: '/changePwdSuc',
            templateUrl: base + 'modules/center/templates/change-suc.html'
        })
        .state('protocol', {
            url: '/protocol',
            templateUrl: base + 'modules/center/templates/protocol.html'
        })
        .state('index', {
            url: '/index',
            templateUrl: base + 'modules/index/templates/index.html'
        });

        $urlRouterProvider.otherwise('/index');

    });

})();


