

/*************歌曲链接数据获取****** */

function songLink(id) {
    // 获取歌曲信息
    $.ajax({
        url: `${API}/song/detail?ids=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            let num = data.songs[0].ar.length
            $('#leftBody_songName').html(data.songs[0].name)
            $('#leftBody_songNickname-h').html(data.songs[0].ar[0].name)
            $('#leftBody_ablumName').html(data.songs[0].al.name)
            $('#songWindow_play').attr('data', data.songs[0].id)
            $('#songWindow_add').attr('data', data.songs[0].id)
            $('#leftBody_songImg').attr('src', data.songs[0].al.picUrl)
            if (num > 1) {
                $('#leftBody_songNickname-p').html(`/${data.songs[0].ar[1].name}`)
            }
        }
    })

    // 获取歌曲歌词
    $.ajax({
        url: `${API}/lyric?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: (data)=> {
            // 歌词处理
            if (data.lrc != null) {
                playBoxLrc(data.lrc.lyric, false)
            } else {
                $('#leftBody_songLrc').append(`<li>暂无歌词</li>`)
            }
        }
    })

    // 获取相关歌单
    $.ajax({
        url: `${API}/simi/playlist?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: (data)=> {
            // console.log(data);
            
            let songContain = template('musicList_containSong_template', data)
            $('#musicList_containSong').html(songContain)
        }
    })

    // 获取相似歌曲
    $.ajax({
        url: `${API}/simi/song?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: (data)=> {
            // console.log(data);
            let songSim = template('songWindow_rightSongSim_template', data)
            $('#songWindow_rightSongSim').html(songSim)
        }
    })
}
// 歌曲详情链接
let lrcShow = true
$('#songWindow_lrcShow').click(function () {
    if (lrcShow) {
        $(this).html("收起")
        $('.leftBody_songLrc').height($('#leftBody_songLrc').height())
        lrcShow = false
    } else {
        $(this).html("展开")
        $('.leftBody_songLrc').height(350)
        lrcShow = true
    }
})

$('#songWindow_play').click(function () {
    let id = $(this).attr('data')
    listSongPlay(id, 0);
})
$('#songWindow_add').click(function () {
    let id = $(this).attr('data')
    listSongPlay(id, 1);
})

/*******点击相似歌曲播放歌曲 ******/
function listSongPlaySim(id, add) {
    if (add == 0) {
        songLink(id)
        listSongPlay(id, 0)
        // 并把信息渲染到 页面上
        songAll(id, 0)
    } else {
        songAll(id, 1)
    }
}