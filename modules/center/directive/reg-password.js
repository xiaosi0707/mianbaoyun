/**
 * Created by wyunfei on 2017/4/21.
 */
'use strict';
var reg = angular.module('cx.center');

reg.directive('regPassword', function () {
   return {
       restrict: 'A',
       controller: function ($scope) {
           $scope.invalidPassword = function () {

               if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test($scope.user.password))) {
                   $scope.user.invalidInfo = '6-18位数字与字母组合密码';
                   return;
               }
               $scope.user.invalidInfo = '';
           };
       }
   };
});



