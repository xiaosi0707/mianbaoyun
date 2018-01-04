(function(){

	'use strict';
	
	//	封装$http请求
	var common = angular.module('cx.common');
	common.factory('requestFactory', function($http, $q, API){

		var factory = {};  
	    factory.request = function(url, method, params){

        	var defer = $q.defer();  
        	var headers = {
           		'Content-Type' : 'application/x-www-form-urlencoded'
       		};

	        $http({  
	            url: API + url,  
	            method: method,  
	            headers: headers,  
	            data: params, 
	            transformRequest: function(data) {
					var str = [];
					for(var p in data){
				   		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
					}
					return str.join('&');
	           	}  
	        }).success(function(data){ 
	            defer.resolve(data); 
	        }).error(function(data, status, headers, config){
	            defer.reject(data);  
	        }); 

	        return defer.promise;  
        }
        return factory; 

	});
	
}());
