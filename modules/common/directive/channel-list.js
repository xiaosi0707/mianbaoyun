(function(){
	
	'use strict';
	
	//	频道列表
	var common = angular.module('cx.common');
	common.directive('cmChannelList', function () {
	    return {
	    	restrict : 'AE',
	    	replace : true,
	        templateUrl : 'modules/common/templates/channel-list.html'
	    };
	});
	
}());
