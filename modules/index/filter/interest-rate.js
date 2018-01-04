(function(){
	
	'use strict';
	
	//	产品年化利率
	var index = angular.module('cx.index');
	index.filter('interestRateFilter', function () {
	    return function(str){
            return str.substring(0, str.length-1);
        }  
	});
	
}());
