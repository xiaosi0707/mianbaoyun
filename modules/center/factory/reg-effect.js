/**
 * Created by wyunfei on 2017/5/15.
 */
'use strict';
var center = angular.module('cx.center');
center.factory('regEffect', function () {
    return {
        effect: function () {
            var flag = true;
            $('.J_reg input').on('focus', function () {
                $('.J_reg span').removeClass().attr('style', '');
                if (flag) {
                    $('.J_reg span').addClass('left');
                    $(this).nextAll('span').animate({'left': 0}, 200);
                    flag = !flag;
                } else {
                    $('.J_reg span').addClass('right');
                    $(this).nextAll('span').animate({'left': 0}, 200);
                    flag = !flag;
                }
            });
        }
    }
});
