// top栏变色
// $('#index_rankinglist').css({
//     backgroundColor: '#9b0909'
// })

/**********************榜单数据处理************** */

function rankinglist_headerChange(data) {
    $('#ranklist_name').html(data.playlist.name)
    $('#titleImg').attr('src', data.playlist.coverImgUrl)
    $('#changeData_share_span').html(data.playlist.shareCount)
    $('#changeData_comments_span').html(data.playlist.commentCount)
    $('#ranklist_playTimes').html(data.playlist.playCount)
    $('#changeData_coll_span').html(data.playlist.subscribedCount)
    // $('#ranklist_update').html(data.playlist.name) 
}