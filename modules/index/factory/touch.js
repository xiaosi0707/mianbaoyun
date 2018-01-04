/**
 * Created by Jinjiyong on 2017/5/24.
 */
 
(function(){
	
	'use strict';

	var index = angular.module('cx.index');
	index.factory('touchFactory', function () {
	    return {
	        init: function () {
		        var oChannel = $('#J_channel');
				var channelHeight = oChannel.height();
				var oIndex = $('#J_index');
				var maxTop = oIndex.offset().top;
				var startY,moveY,endY,disY,dir,offsetTop,disTop,scrollTop;
				var range = (maxTop - channelHeight)*0.2;

				document.addEventListener('touchstart',function(e){

					startY = e.touches[0].pageY;
					offsetTop = oIndex.offset().top;
					disY = startY - offsetTop;

					scrollTop = $(window).scrollTop();
					scrollTop < 5 ? $('html').css('overflow-y','hidden') : $('html').css('overflow-y','auto');

				},false);

				document.addEventListener('touchmove',function(e){
					
					e.preventDefault();

					moveY = e.touches[0].pageY;

					//	判断方向
					dir = moveY < startY ? 'up' : 'down';

					disTop = moveY - disY - maxTop;
					//	移动上限
					if( -disTop > maxTop - channelHeight ){
						disTop = -maxTop + channelHeight;
					}
					//	移动下限
					if( moveY - disY > maxTop ){
						disTop = 0;
					}

					scrollTop = $(window).scrollTop();
					if( (scrollTop < 5 && dir == 'up' && offsetTop == channelHeight && oChannel.hasClass('animate')) ){ 
						$('html').css('overflow-y','auto');
					}
					if( (scrollTop > 5 && dir == 'down' && offsetTop == channelHeight) ){
						$('html').css('overflow-y','auto');
						disTop = -maxTop + channelHeight;
					}else if( scrollTop < 5 && dir == 'down' ){
						$('html').css('overflow-y','hidden');
					}

					//	设置关联元素的变化值
					$('#J_index').css('margin-top', disTop + 'px');
					$('#J_channel_list').addClass('move').css('top', disTop/2 + 'px');
					var ratio = 1 + disTop/(maxTop - channelHeight)*0.1;
					$('#J_channel_list i,#J_channel_list a').css('transform','scale(' + ratio + ')');

					//	滑动至上限时，自动显示水平频道
					if( dir == 'up' && disTop == -maxTop + channelHeight ){
						$('#J_channel').addClass('animate');
					}
					//	滑动至上限时，自动隐藏水平频道
					if( dir == 'down' && disTop == 0 ){
						$('#J_channel').removeClass('animate');
						$('#J_channel_list').removeClass('move');
					}

				},false);

				document.addEventListener('touchend',function(e){

					endY = e.changedTouches[0].pageY;

					//	判断方向
					dir = endY < startY ? 'up' : 'down';

					//	自动吸顶
					if( dir == 'up' && endY - disY < maxTop - range || dir == 'down' && endY - disY < channelHeight + range ){

						$('#J_channel').addClass('animate');
						$('#J_channel_list').animate({
							'top' : (-maxTop + channelHeight)/2 + 'px'
						},200,function(){
							$('#J_channel_list').removeClass('move');
						});
						$('#J_channel_list i,#J_channel_list a').css('transform','scale(.9)');
						$('#J_index').animate({
							'margin-top' : -maxTop + channelHeight + 'px'
						},200);
						
					//	自动置底
					}else if( dir == 'down' && endY - disY > channelHeight + range || dir == 'up' && endY - disY > maxTop - range ){

						$('#J_channel').removeClass('animate');
						$('#J_channel_list').animate({
							'top' : '0px'
						},200,function(){
							$('#J_channel_list').removeClass('move');
						});
						$('#J_channel_list i,#J_channel_list a').css('transform','scale(1)');
						$('#J_index').animate({
							'margin-top' : '0px'
						},200);

					}

				},false);
	        }
	    };
	});
	
}());
