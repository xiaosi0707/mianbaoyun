(function(){
	
	'use strict';
	
	//	售卖权限
	var index = angular.module('cx.index');
	index.filter('businessTypeFilter', function () {
	    return function(str){  
	    	var arr = str.replace(/1/g,'wealth').replace(/2/g,'private').replace(/3/g,'ent').split(','); 
            return arr;  
        }  
	});
	
}());
