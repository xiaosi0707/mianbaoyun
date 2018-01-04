/**
 * Created by wyunfei on 2017/4/19.
 */
'use strict';

var register = angular.module('cx.center');

register.service('getCodeApi', function ($http, API) {
    this.getCode = function (mobile,picCode, templateNo) {
        var args = 'app/message/sendMsg.htm?mobile=' + mobile +'&picCode=' + picCode+'&templateNo=' + templateNo;
        return $http.post(API + args);
    };
});


register.service('registerApi', function ($http, API) {
    this.register = function (isSubmitCommitment, passWord, smsCode, userName) {
      var args = 'app/user/doRegister.htm?isSubmitCommitment=' + isSubmitCommitment +'&passWord=' + passWord +'&smsCode=' + smsCode +'&userName=' + userName;
      return $http.post(API + args);
    };
});

register.service('regMobileApi', function ($http, API) {
    this.checkUserName = function (userName) {
        var args = 'app/user/checkUserName.htm?userName=' + userName;
        return $http.post(API + args);
    };
});
