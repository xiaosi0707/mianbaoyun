(function(){
	
	'use strict';
	
	//	频道
	var common = angular.module('cx.common');
	common.directive('cmChannel', function () {
	    return {
	    	restrict : 'AE',
	    	replace : true,
	        templateUrl : 'modules/common/templates/channel.html'
	    };
	});
	
}());
