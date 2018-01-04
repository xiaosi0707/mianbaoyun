(function(){
	
	'use strict';

	//	产品列表
	var index = angular.module('cx.index');
	index.directive('productList', function () {
	    return {
	    	restrict : 'AE',
	    	replace : true,
	        scope : {
	        	products : '='
	        },
	        templateUrl : 'modules/index/templates/product-list.html'
	    };
	});
	
}());
