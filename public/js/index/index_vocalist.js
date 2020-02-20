// top栏变色
// $('#index_vocalist').css({
//     backgroundColor: '#9b0909'
// })
    /***********首页入驻歌手推荐*********** */
    $('.vocalist_recommendMain').show()
    $('.vocalist_bodyElse').hide()
    $('.vocalist_leftNav i').removeClass('vocalist_linkDotChange')
    $('#link_dot').addClass('vocalist_linkDotChange')
    $('.vocalist_leftNav a').removeClass('link_a')
    $('.vocalist_leftNav a').eq(0).addClass('link_a')
    vocalistClassRecommend()
    /*********首页热门歌手 */
    vocalistHot(100)

//

$('.vocalist_leftNav a').click(function () {
    let t = $(this).text()
    let code = $(this).attr('data')
    $('.vocalist_leftNav i').removeClass('vocalist_linkDotChange')
    $(this).children('i').addClass('vocalist_linkDotChange')
    $('.vocalist_leftNav a').removeClass('link_a')
    $(this).addClass('link_a').siblings('a').removeClass('link_a')

    if (code === -1) {
        vocalistClassRecommend()
        vocalistHot(100)
        $('.vocalist_recommendMain').show()
        $('.vocalist_bodyElse').hide()
    } else {
        // 请求数据
        vocalistClassAll(code)
        //页面显示与隐藏
        $('.vocalist_recommendMain').hide()
        $('.vocalist_bodyElse').show()
        // 歌手title
        $('#vocalist_Allclass').html(t)
    }

})