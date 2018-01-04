/**
 * Created by Jinjiyong on 2017/5/24.
 */

(function(){

	'use strict';
	
	//	面包客滑动切换
	var index = angular.module('cx.index');
	index.factory('swiperFactory', function () {
	    return {
	        init: function () {
		            var userThumbnail = new Swiper('#J_user .thumbnail', {
					loop : true,
					centeredSlides: false,
			        slidesPerView: 'auto',
			        loopedSlides : 8, 
			        touchRatio: 0.2,
			        slideToClickedSlide: true,
			        onSlideChangeEnd: function(swiper){
			        	//	滑动后，切换内容
			        	$('#J_user .thumbnail .swiper-slide').css('opacity','1');
			        	$('#J_user .username').text( $('#J_user .swiper-slide-active').attr('data-nickname') );  
			        	$('#J_user .intro').eq( swiper.realIndex ).show().siblings().hide();
				    }
				});
				//	设置初始项内容
				$('#J_user .thumbnail .swiper-slide-active').prev().css('opacity','0');
				$('#J_user .username').text( $('#J_user .swiper-slide-active').attr('data-nickname') );
	        }
	    };
	});
	
}());
