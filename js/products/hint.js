/**
 * Created by wyunfei on 2017/5/26.
 */
function swiperTab(arr) {
    var swiper = new Swiper('.swiper-container', {
        onInit: function () {
            for(var i = 0; i<arr.length; i++) {
                $('.swiper-pagination-bullet').eq(i).text(arr[i]);
            }
        },
        pagination : '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + '' + '</span>';
        }
    });
};
