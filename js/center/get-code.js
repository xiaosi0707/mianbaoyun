/**
 * Created by wyunfei on 2017/4/21.
 */
$('.code .btn').on('click', function () {
    var i = 60;
    var _this = $(this);
    var timer = null;

    _this.addClass('btnDisable').attr('disabled', 'disabled');
    _this.html(i+'`');
    timer = setInterval(function () {
        i--;
        _this.html(i+'`');
        if(i == 0) {
            clearInterval(timer);
            _this.html('获取验证码');
            _this.removeClass('btnDisable').removeAttr('disabled');
            i = 60;
        }
    }, 1000);

});