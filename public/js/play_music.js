/**************控件显示************ */

// 主界面显示/隐藏
let lock = true
let show = true
let voice = true
let play = true
$('#box_lock').click(function () {
    if (lock) {
        $(this).html('')
        lock = false
    } else {
        $(this).html('')
        $('.valume_song').css({
            display: 'none'
        })
        voice = true
        lock = true
        $('#play_lists').slideUp('.5s')
        show = true
    }
})

$('.play_music_box').mouseleave(function () {
    if (lock) {
        $(this).stop().animate({
            height: 20
        }, 500)

    }
})
$('.play_music_box').mouseenter(function () {
    if (lock) {
        $(this).css({
            height: 80
        })
    }
})

// 歌曲列表的显示/隐藏
$('#play_songslist').click(function () {
    if (show) {
        $('#play_lists').slideDown('.5s')
        // 锁定播放界面
        $('#box_lock').html('')
        lock = false
        // 
        show = false

    } else {
        $('#play_lists').slideUp('.5s')
        // 解锁界面
        $('#box_lock').html('')
        lock = true
        show = true
    }
})
// 点击关闭歌曲列表
$('#close_list').click(function () {
    $('#play_lists').css({
        display: 'none'
    })
    // 解锁界面
    $('#box_lock').html('')
    show = true
    lock = true
})

// 音量界面显示隐藏 
$('#play_voice').click(function () {
    if (voice) {
        $('.valume_song').fadeIn('.3s')
        $('#box_lock').html('')
        lock = false
        voice = false
    } else {
        $('.valume_song').css({
            display: 'none'
        })
        voice = true
    }
})



/**************播放界面******** */
let audio = $('#audioTag').get(0)
// 控制播放暂停
$('#play-stop').click(function () {
    if (play) {
        audio.play();
        $(this).html('')
        play = false
    } else {
        $(this).html('')
        audio.pause();
        play = true
    }
})

//监听歌曲当前播放事件
function timeUpdate(e) {
    let time = e.currentTime
    let m = parseInt(time / 60)
    let s = parseInt(time % 60)
    // 歌曲时间显示
    $('#song_currentTime').html(`${m>9?m:'0'+m}:${s>9?s:'0'+s}`)
    // 进度条变化
    let value = e.currentTime / e.duration;
    $('#progress').css('width', value * 100 + '%');
}


// 文件加载数据后触发 歌曲时长
$('#audioTag').on("loadedmetadata", function () {
    let dur = audio.duration
    let m = parseInt(dur / 60)
    let s = parseInt(dur % 60)
    $('#song_time').html(`${m>9?m:'0'+m}:${s>9?s:'0'+s}`)
});



/************* 音量控制 ***********/
$('#valume_col').mousedown(function () {
    $(document).mousemove(function (e) {
        let h = 100 - (e.pageY - $('.valume_max').offset().top)
        if (h < 100) {
            $('#valume_change').height(h)
        } else {
            $('#valume_change').height(100)
        }
        //  改变音量
        audio.volume = ($('#valume_change').height()) / 100
        $(document).mouseup(function () {
            $(document).off('mousemove')
        })
        $('#valume_max').mouseleave(function () {
            $(document).off('mousemove')
        })
    })
})
$('.valume_max').mouseenter(function () {
    $(document).mousedown(function (e) {
        let h = 100 - (e.pageY - $('.valume_max').offset().top)
        if (h < 100) {
            $('#valume_change').height(h)
        } else {
            $('#valume_change').height(100)
        }
        audio.volume = ($('#valume_change').height()) / 100
    })
    $('.valume_max').mouseleave(function () {
        $(document).off('mousedown')
    })

})



// 拖动进度条改变歌曲时间

$('#songDot').mousedown(function () {
    let w = null
    $(document).mousemove(function (e) {
        w = e.pageX - $('#song_progress').offset().left
        if (w < 493 && w > 0) {
            $('#progress').width(w)
        }
    })
    audio.currentTime = audio.duration * w / 493

    $(document).mouseup(function () {
        $(document).off('mousemove')
    })
    $('#song_progress').mouseleave(function () {
        $(document).off('mousemove')
    })
})
// 点击进度条改变歌曲时间
$('#song_progress').click(function (e) {
    let w = e.pageX - $(this).offset().left
    audio.currentTime = audio.duration * w / 493
    if (w < 493 && w > 0) {
        $('#progress').width(w)
    }
})

// 当改变进度条 更新时间
function changeDate(e) {
    let time = e.currentTime
    let m = parseInt(time / 60)
    let s = parseInt(time % 60)
    $('#song_currentTime').html(`${m>9?m:'0'+m}:${s>9?s:'0'+s}`)
}

/**********点击歌单播放音乐以及播放器列表的渲染******* */
function detailPlay(id) {
    // 点击改变播放器设置，重新开始
    $('#play-stop').html('')
    // 播放界面显示
    $('.play_music_box').css({
        height: 80
    })
    // 将界面锁关闭
    $('#box_lock').html('')
    lock = false
    audio.autoplay = true
    play = false
    $.ajax({
        url: `${API}/playlist/detail?id=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let songId = data.playlist.tracks[0].id
            // 调用获取歌曲所有信息的函数
            songAll(songId, 0)
        }
    })
}

/**********点击播放器列表播放音乐********* */
function listSongPlay(id, isBox) {
    if (isBox == 0) {
        // 初始化播放器
        $('#progress').css('width', 0);
        $('#play-stop').html('')
        // 播放界面显示
        $('.play_music_box').css({
            height: 80
        })
        // 将界面锁关闭
        $('#box_lock').html('')
        lock = false
        audio.pause();
        play = true
        // 调用获取歌曲所有信息的函数
        songAll(id, 0)
        songAll(id, 1)
        // 自动播放
        audio.autoplay = true
        $('#play-stop').html('')
        play = false
    } else if (isBox === 1) {
        $('#progress').css('width', 0);
        $('#play-stop').html('')
        // 播放界面显示
        $('.play_music_box').css({
            height: 80
        })
        // 将界面锁关闭
        $('#box_lock').html('')
        lock = false
        audio.pause();
        play = true
        // 调用获取歌曲所有信息的函数
        songAll(id, 0)
        // 自动播放
        audio.autoplay = true
        $('#play-stop').html('')
        play = false
    } else {
        songAll(id, 1)
    }
}

/***********获取歌曲信息/歌词/url********* */
// 渲染到播放器中
function songAll(id, add) {
    // 获取歌曲url
    if (add == 0) {
        $.ajax({
            url: `${API}/song/url?id=${id}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: function (data) {
                $('#audioTag').attr('src', data.data[0].url);
            }
        })
        // 获取歌曲信息
        $.ajax({
            url: `${API}/song/detail?ids=${id}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: (data) => {
                // console.log(data.songs);
                // 渲染列表
                changeList(0, data.songs[0])
                // 调用改变信息的函数
                messageChange(data)
            }
        })
        // 获取歌曲歌词
        $.ajax({
            url: `${API}/lyric?id=${id}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: (data) => {
                // console.log(data);
                // 歌词处理
                if (data.lrc != null) {
                    playBoxLrc(data.lrc.lyric, true)
                } else {
                    $('#lrcBody').append(`<li class="bodyLyric_listItem">暂无歌词</li>`)
                }
            }
        })
    } else {
        $.ajax({
            url: `${API}/song/detail?ids=${id}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: (data) => {
                // console.log(data.songs);

                changeList(1, data.songs[0])
            }
        })
    }
}

/**********************歌曲信息处理************** */
function messageChange(data) {
    $('#play_songImg').attr('src', data.songs[0].al.picUrl)
    $('#play_songImg').attr('title', data.songs[0].name)
    $('#play_song_name').html(data.songs[0].name)
    $('#song_name_title').html(data.songs[0].name)
    $('#play_song_nickname').html(data.songs[0].ar[0].name)
}

/******************歌单列表的操作***********/

$('#removeLists').click(function () {
    $('#songslist').empty()
    $('#songsNumber').html(0)
    $('#playList_songsNumber').html(`(0)`)
})
/************** 歌词处理 ********* */
function playBoxLrc(str, isBox) {
    //先清空歌词
    $('#bodyLyric_list').empty()
    // 正则表达式选出[]及里面全部内容
    let patt = /\[(.+?)\]/g
    // 按照换行符分割数组
    let newstr = str.split('\n')
    let lrc = {
        data: []
    }
    newstr.forEach(ele => {
        let o = {}
        let e = ele.split(patt)
        if (e[0] === '' && e[2] != '' && e[1] != undefined) {
            o.t = e[1];
            o.c = e[2]
            lrc.data.push(o)
        }
    });
    // 渲染歌词
    if (isBox) {
        let box = template("lrcBody_temp", lrc)
        $('#lrcBody').html(box)
    } else {
        let win = template("leftBody_songLrc_temp", lrc)
        $('#leftBody_songLrc').html(win)
    }
}


function changeList(add, data, e) {
    let d = setData(true)
    let num = d.length
    if (add === 1) {
        d.unshift(data)
        showList(d, num)
        setData(false, d)
    } else if (add === -1) {
        d.splice(e, 1)
        showList(d, num)
        setData(false, d)
    } else if (add === 0) {
        showList(d, num)
    }
}

// 存储数据的方法
function setData(get, data) {
    if (get) return JSON.parse(window.localStorage.getItem('data'));

    window.localStorage.setItem('data', JSON.stringify(data))
}

function removeSong(e) {
    let data = setData(true)
    data.splice(e, 1)
    changeList(-1, data, e)
}

function showList(d, num) {
    $('#songsNumber').html(num)
    $('#playList_songsNumber').html(`(${num})`)
    let list = {
        data: d
    }
    let list_temp = template('songslist_template', list)
    $('#songslist').html(list_temp)
}