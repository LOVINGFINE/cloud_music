$(function(){
    // top栏变色
// $('#index_newAlbum').css({
//     backgroundColor: '#9b0909'
// })

$.ajax({
    url: `${API}/album/newest`,
    type: 'get',
    async: true,
    dataType: 'json',
    success: function (data) {
       let newAlbum_hot = template('newAlbum_hot_template',data)
       $('#newAlbum_hot').html(newAlbum_hot)
       
    }
})

//隐藏相应的页数


// 根据页数请求数据
function newAlbumGet(page){
    $.ajax({
        url: `${API}/top/album?offset=${page}&limit=35`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
        //    console.log(data);
           
           let newAlbum_all = template('newAlbum_all_template',data)
           $('#newAlbum_all').html(newAlbum_all)
           
        }
    })
}
var pageIndex = 0
// h获取第一页的信息
newAlbumGet(pageIndex)

$('.pageNumber').click(function(){
    $(this).css({
        backgroundColor:'#9b0909',
        color:'#fff'
    })
    $(this).siblings('.pageNumber').css({
        backgroundColor:'#fff',
        color:'rgb(71, 71, 71)'
    })
    pageIndex = $(this).html()
    // pageChangeIndex(pageIndex)
    // console.log(pageIndex);
    pageIndex -= 1
    newAlbumGet(pageIndex)
    // if(pageIndex = 1){
    // pageIndex = $(this).index()
    // newAlbumGet(page)
    //     $('#pageDots_min').css({
    //         display:'block'
    //     })
    // }
})

// 页数处理转换 

// function pageChangeIndex(changeIndex){
//     if(changeIndex === 0 ){
//         return 0
//     }else if(changeIndex < 17){
//         return changeIndex -1
//     }else if(change === 16){
//         return 14
//     }
// }
})