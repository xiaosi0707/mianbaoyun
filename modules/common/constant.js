/**
 * Created by wyunfei on 2017/4/17.
 */
'use strict';
var common = angular.module('cx.common');
var config = process.env.CONFIG;

common.constant('API', config.config.api);
common.constant('wxApi', config.config.wxApi);
