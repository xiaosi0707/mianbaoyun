/**
 * Created by wyunfei on 2017/4/21.
 */

/* 清除按钮显示/隐藏 Start */
$('.username, .password').find('input').on('focus', function () {
    $(this).nextAll().fadeIn();
});
/* 清除按钮显示/隐藏 End */

/* 清除功能 Start */
$('.username, .password').find('i').on('click', function () {
    $(this).prev('input').val('');
    $(this).next().fadeOut();
    $(this).fadeOut();
})
/* 清除功能 End */

/* 显示/隐藏密码 Start */
var flag = true;
function showHide(objTri, inputType, imgSrc) {
    $(objTri).prevAll('input').attr('type', inputType);
    //$(objTri).attr('src', imgSrc);
    $(objTri).css({
        'background': 'url(' + imgSrc + ')',
        'background-size': 'contain'
    });
    flag = !flag;
}
$('.password em').on('click', function () {
    flag? showHide(this, 'text', '../../img/center/eyes-open@2x.png'): showHide(this, 'password', '../../img/center/eyes-close@2x.png');
});
/* 显示/隐藏密码 End */