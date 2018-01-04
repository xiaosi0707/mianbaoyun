(function(){
	
	'use strict';
	
	var index = angular.module('cx.index');
	index.controller('indexController', function ($scope, $http, $timeout, requestFactory, swiperFactory, touchFactory) {

		var params = {'token' : 'DLR18610806009'};
		requestFactory.request('app/itera/index.htm', 'POST', params).then(function(data) {  
			//success函数 

			$scope.agentList = data.body.agentList;
			$scope.productList = data.body.p2pProList;

			$timeout(function(){
				swiperFactory.init();
			},100);

		},function(data){  
			//error函数  

		});

		$timeout(function(){
			touchFactory.init();
		},100);
		
	});
	
}());
