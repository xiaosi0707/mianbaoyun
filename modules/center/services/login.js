/**
 * Created by wyunfei on 2017/4/17.
 */
'use strict';
var login = angular.module('cx.center');
login.service('LoginApi', function ($http, API) {
   this.login = function (userName, passWord) {
       var args = 'app/user/dologin.htm?userName=' + userName + '&passWord=' + passWord;
       //return $http.post(API + args);
       return $http({
           url : API + 'app/user/dologin.htm',
           method : 'POST',
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           },
           data : {
               'userName' : userName,
               'passWord' : passWord
           },
           transformRequest: function(data) {
               var str = [];
               for(var p in data){
                   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
               }
               return str.join("&");
           }
       });
   };
});

login.service('changePwdApi', function ($http, API) {
   this.changePwd = function (userName, smsCode, passWord) {
        var args = 'app/user/forgetPSW.htm?userName=' + userName + '&smsCode=' + smsCode + '&passWord=' + passWord;
        return $http.post(API + args);
   };
});

