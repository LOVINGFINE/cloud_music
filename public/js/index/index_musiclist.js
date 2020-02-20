
var pageNumber = 0
var allPageData = []
var allMusiclistData = null
// top栏变色
// $('#index_musiclist').css({
//     backgroundColor: '#9b0909'
// })

$('.page_index').eq(0).css({
    backgroundColor: 'rgb(150, 11, 11)'
}).siblings('.page_index').css({
    backgroundColor: 'rgb(230, 225, 225)'
})


// 换页方法函数 请求数据的方法
function pageChange(pageNumber) {
    let data = allPageData[pageNumber]
    let musiclist = template("musiclist_all_template", data)
    $('#main_musiclist_all').html(musiclist)
}



// 点击下一页 
$('#page_next').click(function () {
    changePage_idx(true)
})
// 点击上一页
$('#page_prev').click(function () {
    changePage_idx(false)
})
// 鼠标经过，变色
$('#page_prev').mouseenter(function () {
    if (pageNumber === 0) {
        $(this).css({
            backgroundColor: 'rgb(230, 225, 225)'
        })
    } else {
        $(this).css({
            backgroundColor: 'rgb(150, 11, 11)'
        })
    }
})
// $(document).mouseenter(function(){
//     if(pageNumber === 0){
//         $('#page_prev').off('mouseenter')
//     }
// })
$('#page_next').mouseenter(function () {
    if (pageNumber === 8) {
        $(this).css({
            backgroundColor: 'rgb(230, 225, 225)'
        })
    } else {
        $(this).css({
            backgroundColor: 'rgb(150, 11, 11)'
        })
    }

})
// 鼠标离开事件 
$('#page_prev').mouseleave(function () {
    $(this).css({
        backgroundColor: 'rgb(230, 225, 225)'
    })

})
$('#page_next').mouseleave(function () {
    $(this).css({
        backgroundColor: 'rgb(230, 225, 225)'
    })
})

// 点击索引换页 
// $('.page_index').click(function () {
//     $(this).css({
//         backgroundColor: 'rgb(150, 11, 11)'
//     }).siblings('li').css({
//         backgroundColor: 'rgb(230, 225, 225)'
//     })
//     pageNumber = $(this).index();
//     pageChange(pageNumber)
// })

// function changePage_idx(pageNext) {
//     if (pageNext) {
//         if (pageNumber < 8) {
//             pageNumber++
//             pageChange(pageNumber);
//             $('.page_index').eq(pageNumber).css({
//                 backgroundColor: 'rgb(150, 11, 11)'
//             }).siblings('li').css({
//                 backgroundColor: 'rgb(230, 225, 225)'
//             })
//         }
//         return
//     } else {
//         if (pageNumber == 0) {
//             return
//         }
//         pageNumber--
//         pageChange(pageNumber);
//         $('.page_index').eq(pageNumber).css({
//             backgroundColor: 'rgb(150, 11, 11)'
//         }).siblings('li').css({
//             backgroundColor: 'rgb(230, 225, 225)'
//         })
//     }
// }

$('.pageNumber').click(function () {
    $(this).css({
        backgroundColor: '#9b0909',
        color: '#fff'
    })
    $(this).siblings('.pageNumber').css({
        backgroundColor: '#fff',
        color: 'rgb(71, 71, 71)'
    })
    pageIndex = $(this).html()
})

var musicClass_box = true;
// 分类框
$("#musiclist_chice").click(function(){
    if(musicClass_box){
        $("#musiclist_classAllBox").slideDown('.5')
        musicClass_box = false
    }else {
        $("#musiclist_classAllBox").slideUp('.5')
        musicClass_box = true
    }
    
})