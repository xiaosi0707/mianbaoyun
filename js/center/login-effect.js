/**
 * Created by wyunfei on 2017/5/16.
 */

//用户名
$('.J_username').on('focus', function () {
    $(this).attr('data-flag', 'true');
    //判断获取过焦点
    if ($('.J_password').attr('data-flag') == 'false') {
        //未获取过
        $(this).nextAll('span').animate({'left': 0}, 200);
    } else {
        //曾获取过
        $('.J_password').nextAll('span').animate({'left': 100 + '%'}, 200, function () {
            $('.J_mask').removeClass('mask-top').attr('style', '').addClass('mask-bot').animate({'top': 20.73 + 'rem'}, 200, function () {
                $('.J_username').nextAll('span').css('left', 100 + '%').animate({'left': 0}, 200);
            });
        });
    }
});

//密码
$('.J_password').on('focus', function () {
    $(this).attr('data-flag', 'true');
    //判断获取过焦点
    if ($('.J_username').attr('data-flag') == 'false') {
        //未获取过
        $(this).nextAll('span').animate({'left': 0}, 200);
    } else {
        //曾获取过
        $('.J_username').nextAll('span').animate({'left': 100 + '%'}, 200, function () {
            $('.J_mask').removeClass('mask-bot').attr('style', '').addClass('mask-top').animate({'top': 20.73 + 'rem'}, 200, function () {
                $('.J_password').nextAll('span').css('left', 100 + '%').animate({'left': 0}, 200);
            });
        });
    }

});
