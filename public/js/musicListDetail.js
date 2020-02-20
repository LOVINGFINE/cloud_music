

/**********点击歌单列表的渲染******* */
function musicListDetail(id) {
    $.ajax({
        url: `${API}/playlist/detail?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);

            //列表渲染；歌曲列表

            let musicList = template('musicList_template', data.playlist)
            $('#musicList').html(musicList)

            let createTime = data.playlist.createTime
            $('#musicDetail_img').attr('src', data.playlist.coverImgUrl)
            $('#musicListDetail_songName').html(data.playlist.name)
            $('#musiclistDetail_nicknameImg').attr('src', data.playlist.creator.avatarUrl)
            $('#musicListDetail_nickname').html(data.playlist.creator.nickname)

            // 时间处理，需要计算，粗略处理
            let y = parseInt(createTime / 365 / 24 / 60 / 60 / 1000) + 1970
            let m = parseInt((createTime % 365) / 30)
            let d = parseInt((createTime % 365) % 30)
            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;
            $('#musicList_createTime').html(`${y}-${m}-${d}`)

            $('#metodAdd').html(data.playlist.subscribedCount)
            $('#metodShare').html(data.playlist.shareCount)
            $('#metodCom').html(data.playlist.commentCount)

            let tags = data.playlist.tags

            // 先清空，后增加
            $('.musicList_labelBox').empty('a')
            tags.forEach(ele => {
                $('.musicList_labelBox').append(`<a href="#" class="musicList_label">${ele}</a>`)
            });
            $('#introduceTxt').html(data.playlist.description)

            $('#songNumber').html(data.playlist.trackCount)
            $('#playTimes').html(data.playlist.playCount)


        }
    })

    $.ajax({
        url: `${API}/playlist/subscribers?id=${id}&limit=8`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // 喜欢这个歌单的人
            let perlv = template('right_personLove_template', data)
            $("#right_personLove").html(perlv)
        }
    })

    $.ajax({
        url: `${API}/related/playlist?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // 喜欢这个歌单的人
            let about = template('right_about_template', data)
            $("#right_about").html(about)
        }
    })
}