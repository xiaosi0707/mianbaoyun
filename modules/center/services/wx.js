/**
 * Created by wyunfei on 2017/4/27.
 */

'use strict';
var wx = angular.module('cx.center');

wx.service('wxBind', function ($http, wxApi) {
    this.bind = function (token, openid) {
        var args = 'app/wx/user/bind.htm?token=' + token + '&openid=' + openid ;
        return $http.post(wxApi + args);
    };
    this.isBind = function (openid) {
        var args = 'app/wx/user/isBind.htm?openid=' + openid;
        return $http.post(wxApi + args);
    };
});
