(function(){
	
	'use strict';
	
	//	产品名称
	var index = angular.module('cx.index');
	index.filter('productNameFilter', function () {
	    return function(str,param){  
	    	var index = str.indexOf('】');
	    	if(param == '0'){
	    		str = str.substring(0, index + 1);
	    	}else{
	    		str = str.substring(index + 1);
	    	}
            return str;  
        }  
	});
	
}());
