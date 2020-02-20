$('#index_main').empty()
getTarget(1)
const ranklist_id = [3779629, 3778678, 2884035, 19723756, 10520166, 180106, 60198, 21845217, 11641012, 120001, 60131, 745956260, 745956260, 745956260, 112463, 10520166, 1, 2, 2847251561, 27135204, 112463, 3812895, 71385702, 991319590]
const indexHash = window.location.hash.split('/')[1]
getPage(indexHash)

function getPage(str) {
    if (str === undefined) {
        getTarget(1)
    } else {
        let h = str.substring(0, 1)
        if (h == 'i') {
            // 首页
            getTarget(1)
        } else if (h == 'r') {
            // 榜单页 
            let r = str.split('?')[1].split('=')[1]
            getTarget(2, r)
        } else if (h == 'm') {
            //歌单页
            let m = str.split('?')[1].split('=')[1] || '全部';
            getTarget(3, m)
        } else if (h === 'D') {
            // 电台页
            getTarget(4)
        } else if (h === 'v') {
            // 歌手页
            getTarget(5)
        } else if (h === 'n') {
            // 专辑新碟
            getTarget(6)
        } else if (h === 's') {
            // 歌曲详情
            let s = str.split('?')[1].split('=')[1]
            getSong(s)
        } else if (h == 'd') {
            // 歌单详情页
            let ml = str.split('?')[1].split('=')[1]
            getMusicList(ml)
        } else if (h == 'g') {
            // 搜索页
            let sa = decodeURI(str.split('?')[1].split('=')[1].split('&')[0]);
            let st = str.split('?')[1].split('=')[2].split('&')[0];
            let sf = str.split('?')[1].split('=')[3]||0;
            getSearch(st, sa, sf)
        }
    }
}

// 导航栏链接
function getTarget(e, id) {
    if (e == 1) {
        $.ajax({
            url: '/index_recommend.html',
            success: (res) => {
                $('#index_main').html(res)
                index()
            }
        })
    } else if (e == 2) {
        $.ajax({
            url: '/index_rankinglist.html',
            success: (res) => {
                $('#index_main').html(res)
                // 请求第一个榜单的数据渲染
                getRanklist_left()
                rankListShow(id)
            }
        })
    } else if (e == 3) {
        let limit = 35
        let cat = id
        let order = 'hot'
        $.ajax({
            url: '/index_musiclist.html',
            success: (res) => {
                $('#index_main').html(res)

                // 调用ajax请求数据，渲染到页面
                musiclistGet(limit, cat, order)
            }
        })
    } else if (e == 4) {
        $.ajax({
            url: '/index_DJstation.html',
            success: (res) => {
                $('#index_main').html(res)
            }
        })
    } else if (e == 5) {
        $.ajax({
            url: '/index_vocalist.html',
            success: (res) => {
                $('#index_main').html(res)
            }
        })
    } else if (e == 6) {
        $.ajax({
            url: '/index_newAlbum.html',
            success: (res) => {
                $('#index_main').html(res)
            }
        })
    }
}
// 歌曲详情
function getSong(id) {
    console.log(1);
    
    $.ajax({
        url: '/song_window.html',
        success: (res) => {
            console.log(res);
            
            $('#index_main').html(res)
            songLink(id)
        }
    })
}
// 歌单详情
function getMusicList(id) {
    $.ajax({
        url: '/musicListDetail.html',
        success: (res) => {
            $('#index_main').html(res)
            musicListDetail(id)
        }
    })
}
// 搜索详情

function getSearch(type, key, offset) {
    
    $.ajax({
        url: '/search.html',
        success: function (res) {
            $('#index_main').html(res)
            keywordsHash = key
            $('.search_navItem>a').each((i, ele) => {
                $(ele).attr('href', `/#/get?key=${key}&type=${arr[i]}`)
            });
            getSearchType(type, offset)
        }
    })
}



function getRanklist_left() {
    $.ajax({
        url: `${API}/toplist`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // 模板渲染
            let hot_rankinglist = template("hot_rankinglist_template", data)
            $('#hot_rankinglist').html(hot_rankinglist)
            let other_rankinglist = template("other_rankinglist_template", data)
            $('#other_rankinglist').html(other_rankinglist)
        }
    })
}

// 请求歌单数据，需要传入order,cat,limit
function musiclistGet(limit, cat, order) {
    $.ajax({
        url: `${API}/top/playlist?limit=${limit}&cat=${cat}&order=${order}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success:  (data)=> {
            // console.log(data.cat);
            $('#musiclistClass_name').html(data.cat)
            // 模板渲染
            let musiclist = template("musiclist_all_template", data)
            $('#main_musiclist_all').html(musiclist)
        }
    })
}


