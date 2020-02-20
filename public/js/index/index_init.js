/*************初始化播放器********* */
function initPlayBox(id) {
    $('#progress').css('width', 0);
    $.ajax({
        url: `${API}/top/list?idx=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data.playlist.tracks);
            // console.log(data.playlist.tracks[3].ar.length);
            let songList = []
            data.playlist.tracks.forEach((ele, i) => {
                if (i < 30) {
                    songList.push(ele)
                }
            })
            songList.forEach((ele) => {
                // ele.dt = `${parseInt(ele.dt/6000)>9?parseInt(ele.dt/6000):'0'+parseInt(ele.dt%6000)}:${parseInt(ele.dt%6000)>9?parseInt(ele.dt%6000):+'0'+parseInt(ele.dt%6000)}`
                if (ele.ar.length === 2) {
                    ele.ar[0].name = ele.ar[0].name + '/' + ele.ar[1].name
                }
            })

            //  将数据写入 localStorage
            setData(false, songList)
            // 渲染列表
            changeList(0)
            // 第一首歌
            songAll(songList[5].id, 0)
        }
    })
}
// 初始化播放器  默认热歌榜前三十首歌
initPlayBox(1);