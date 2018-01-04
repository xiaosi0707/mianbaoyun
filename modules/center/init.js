/**
 * Created by wyunfei on 2017/4/17.
 */
'use strict';
var personCenter = angular.module('cx.center', []);
require('./controllers/login');
require('./controllers/register');
require('./controllers/changePwd');

require('./services/login');
require('./services/register');
require('./services/wx');

require('./directive/reg-mobile');
require('./directive/reg-img');
require('./directive/reg-code');
require('./directive/reg-password');

require('./factory/get-code');
require('./factory/input-clear');
require('./factory/reg-effect');


