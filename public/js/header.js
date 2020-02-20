const API = "http://127.0.0.1:3001";
// 域名设置

const aaaaaaa = "---------------你很幸运-----------\n------------你也很优秀-------------\n----------好运常伴------------"
console.log(aaaaaaa);

/********手机号登陆窗口************** */
$(function () {
    $('.m_login').click(function () {
        $('.mark').show()
        $('#m_login').show().offset({
            top: 200,
            left: '30%'
        })
    })
    $('#m_login_close').click(function () {
        $('#m_login').hide()
        $('.mark').hide()
    })

    $('#m_top_move').mousedown(function (e) {
        let x = e.pageX - $('#m_login').offset().left
        let y = e.pageY - $('#m_login').offset().top
        $('#m_login').mousemove(function (event) {
            $('#m_login').offset({
                top: event.pageY - y,
                left: event.pageX - x
            })
        })
    })
    $(document).mouseup(function () {
        $('#m_login').off('mousemove')
    })
    $('#m_top_move').mouseleave(function () {
        $('#m_login').off('mousemove')
    })

})


/*************导航栏动态************ */
$(function () {
    $('.header_login').mouseenter(function () {
        $('#login_lis').show()
    })
    $('.header_login').mouseleave(function () {
        $('#login_lis').hide()
    })

    $('#search').focus(function() {
        $('#search').val('')
        $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                let keyWords = $('#search').val()
                if (keyWords === '') {
                    return
                } else {
                    let res = keyWords.substring(0, 1)
                    if (res != '') {
                        $("header").append(`<a href="/#/get?key=${keyWords}&type=1" id="index_search"></a>`)
                        let a = document.getElementById('index_search')
                        a.click();
                        getSearch(1,keyWords,0);
                    }
                }

            }

        })
    });
    $('#search').focusout(function () {
        let val = $(this).val()
        if (val === '') {
            $(this).val('音乐/视频/电台/用户')
        } else {
            return
        }
    });

})









/*****************歌单请求处理*********/
// 需要传入limit，cat，order

function getMusicList(limit, cat, order) {
    $.ajax({
        url: `${API}/top/playlist?limit=${limit}&order=${order}&cat=${cat}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let list = template("hot_list_temp", data)
            $('#list_hot').html(list)
        }
    })
}


// 根据榜单id请求榜单数据
function rankListShow(idx) {
    // 根据id返回索引
    let id = ranklist_id.findIndex(value => value == idx)
    if (id == -1) {
        id = 3
        $.ajax({
            url: `${API}/top/list?idx=${id}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                rankinglist_headerChange(data)
                // 模板渲染
                let rankinglist_all = template("ranklist_bodyData_temp", data.playlist)
                $('#ranklist_bodyData').html(rankinglist_all)

            }
        })
    }

    // 如果榜单数据没有跳到首页
    $.ajax({
        url: `${API}/top/list?idx=${id}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            rankinglist_headerChange(data)
            // 模板渲染
            let rankinglist_all = template("ranklist_bodyData_temp", data.playlist)
            $('#ranklist_bodyData').html(rankinglist_all)

        }
    })
}

/*****************************电台首页数据***************** */

// 首页电台分类
function djStationClass() {
    $.ajax({
        url: `${API}/dj/catelist`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            let list_one = template('djstation_navOne_template', data)
            let list_two = template('djstation_navTwo_template', data)
            $('#djstation_nav_one').html(list_one)
            $('#djstation_nav_two').html(list_two)
        }
    })
}

function djStationRecommend() {
    $.ajax({
        url: `${API}/program/recommend`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            let list_left = template('djstationOne_bodyLeft_template', data)
            $('#djstationOne_body_left').html(list_left)
        }
    })

    $.ajax({
        url: `${API}/dj/hot?limit=10`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let list_right = template('djstationOne_bodyRight_template', data)
            $('#djstationOne_body_right').html(list_right)
        }
    })
}
// 请求所有电台数据
function djStationAll(type) {
    $.ajax({
        url: `${API}/dj/recommend/type?type=${type}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // 根据type的值选择模板
            switch (type) {
                case 1:
                    //明星做主播

                    break;
                case 2:
                    // 音乐故事
                    let list_two = template('djstation_bodyTwo_template', data)
                    $('#djstation_bodyTwo').html(list_two)
                    break;
                case 3:
                    // 情感调频
                    let list_five = template('djstation_bodyFive_template', data)
                    $('#djstation_bodyFive').html(list_five)
                    break;
                case 4:
                    //娱乐|影视
                    break;
                case 5:
                    //脱口秀
                    let list_four = template('djstation_bodyFour_template', data)
                    $('#djstation_bodyFour').html(list_four)
                    break;
                case 6:
                    //美文读物
                    let list_three = template('djstation_bodyThree_template', data)
                    $('#djstation_bodyThree').html(list_three)
                    break;
                case 7:
                    //广播剧
                    break;
                case 8:
                    //相声曲艺
                    break;
                case 11:
                    // 人文历史
                    let list_seven = template('djstation_bodySeven_template', data)
                    $('#djstation_bodySeven').html(list_seven)
                    break;
                case 12:
                    //旅途|城市
                    break;
                case 13:
                    //  外语世界
                    break;
                case 14:
                    //亲子宝贝
                    break;
                case 2001:
                    // 创作|翻唱
                    let list_six = template('djstation_bodySix_template', data)
                    $('#djstation_bodySix').html(list_six)
                    break;
                case 10002:
                    //"3D|电子" 

                    break;
                case 3001:
                    //二次元

                    break;
                case 4001:
                    // 校园|教育

                    break;
                case 10001:
                    //有声书

                    break;
                case 453050:
                    //知识技能

                    break;
                case 453051:
                    // 商业财经

                    break;

                case 453052:
                    //科技科学
                    break;

                default:

                    break;
            }
        }
    })
}

/************************歌手数据处理************** */

// 歌手分类，请求

function vocalistClassRecommend() {
    $.ajax({
        url: `${API}/artist/list?cat=5001`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let classHome = template('vocalist_rightHome_template', data)
            $('#vocalist_rightHome').html(classHome)
        }
    })
}

function vocalistClassAll(code) {
    $.ajax({
        url: `${API}/artist/list?cat=${code}&limit=50`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let classHome = template('vocalist_bodyElse_template', data)
            $('#vocalist_bodyElse').html(classHome)
        }
    })
}

// 热门歌手数据

function vocalistHot(limit) {
    $.ajax({
        url: `${API}/top/artists?limit=${limit}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let classHot = template('vocalist_rightHot_template', data)
            $('#vocalist_rightHot').html(classHot)
        }
    })
}