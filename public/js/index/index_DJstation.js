
// $('#index_DJstation').css({
//     backgroundColor: '#9b0909'
// })
    // 请求电台分类信息 
    djStationClass()
    // 请求电台推荐；排行
    djStationRecommend()
    // 请求音乐故事推荐
    djStationAll(2)
    // 请求美文读物推荐
    djStationAll(6)
    // 请求脱口秀推荐
    djStationAll(5)
    // 请求情感调频推荐
    djStationAll(3)
    // 请求创作|翻唱推荐
    djStationAll(2001)
    // 请求人文历史推荐
    djStationAll(11) 


// 左右点击换页
$('.djstation_nav_right').click(function () {

    $('.djstation_nav_two').css({
        backgroundColor: 'red'
    })
    $('.djstation_nav_one').css({
        backgroundColor: 'rgba(85, 85, 85, 0.4)'
    })
    $(".djstation_nav_right,#djstation_nav_one").css({
        display: 'none'
    })
    $('.djstation_nav_left,#djstation_nav_two').css({
        display: 'block'
    })

})

$('.djstation_nav_left').click(function () {

    $('.djstation_nav_two').css({
        backgroundColor: 'rgba(85, 85, 85, 0.4)'
    })
    $('.djstation_nav_one').css({
        backgroundColor: 'red'
    })
    $('.djstation_nav_left,#djstation_nav_two').css({
        display: 'none'
    })
    $('.djstation_nav_right,#djstation_nav_one').css({
        display: 'block'
    })

})

// 点击索引换页
$('.djstation_nav_one').click(function () {

    $('.djstation_nav_one').css({
        backgroundColor: 'red'
    })
    $('.djstation_nav_two').css({
        backgroundColor: 'rgba(85, 85, 85, 0.4)'
    })
    $('.djstation_nav_left,#djstation_nav_two').css({
        display: 'none'
    })
    $('.djstation_nav_right,#djstation_nav_one').css({
        display: 'block'
    })

})

$('.djstation_nav_two').click(function () {

    $('.djstation_nav_one').css({
        backgroundColor: 'rgba(85, 85, 85, 0.4)'
    })
    $('.djstation_nav_two').css({
        backgroundColor: 'red'
    })
    $('.djstation_nav_right,#djstation_nav_one').css({
        display: 'none'
    })
    $('.djstation_nav_left,#djstation_nav_two').css({
        display: 'block'
    })

})


// 点击电台分类 处理

function getDjStation(type){
    // console.log(type);
    
}