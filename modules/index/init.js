'use strict';

var index = angular.module('cx.index', []);

require('./controllers/index');

require('./directive/product-list');

require('./factory/swiper');
require('./factory/touch');

require('./filter/business-type');
require('./filter/product-name');
require('./filter/interest-rate');
