function index() {
    // 轮播图数据
    $.ajax({
        url: `${API}/banner`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let list = template("banner", data)
            $('#banner_pic').html(list)
            moveBanner()
        }
    })

    /*********主页榜单数据 *********/

    // 飙升榜
    $.ajax({
        url: `${API}/top/list?idx=3`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // console.log(data.playlist.id);
            // 榜单图片
            $('#headerList_oneImg').attr('src', data.playlist.coverImgUrl)
            let list = template("list_one_temp", data.playlist)
            $('#list_one').html(list)

        }
    })

    // 新歌榜
    $.ajax({
        url: `${API}/top/list?idx=0`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // 榜单图片
            $('#headerList_twoImg').attr('src', data.playlist.coverImgUrl)
            let list = template("list_two_temp", data.playlist)
            $('#list_two').html(list)
        }
    })

    // 原创榜
    $.ajax({
        url: `${API}/top/list?idx=2`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            // 榜单图片
            $('#headerList_threeImg').attr('src', data.playlist.coverImgUrl)
            let list = template("list_three_temp", data.playlist)
            $('#list_three').html(list)
        }
    })



    $.ajax({
        url: `${API}/personalized?limit=8`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let index_list = template("hot_list_temp", data)
            $('#list_hot').html(index_list)
        }
    })


    /*********主页歌手栏 *********/

    $.ajax({
        url: `${API}/artist/list?cat=5001`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let list = template("artists_temp", data)
            $('#artists_in').html(list)
        }
    })


    /*********主页最新专辑 *********/
    $.ajax({
        url: `${API}/album/newest`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            let list = template("albums_temp", data)
            $('#albums_person').html(list)
            recommendAlbum();
        }
    })

    /*******推荐专辑动画 *********/
    function recommendAlbum() {
        let num = 0
        let len = 628
        $('#n_left').click(function () {
            if (num < 2) {
                num++
                $('.show_block').animate({
                    left: -num * len
                }, 1000)

            } else {
                $('.show_block').css({
                    left: 0
                })
                num = 1
                $('.show_block').animate({
                    left: -num * len
                }, 1000)
            }
        })
        $('#n_right').click(function () {
            if (num > 0) {
                num--
                $('.show_block').animate({
                    left: -num * len
                }, 1000)

            } else {
                $('.show_block').css({
                    left: -2 * len
                })
                num = 1
                $('.show_block').animate({
                    left: -num * len
                }, 1000)
            }
        })
    }

    /************轮播图动画******** */
    function moveBanner() {

        let idx = 0
        let imgw = $('.list_imgs img').width()
        let timer = null
        let imgh = $('.list_imgs img').height()
        $('.nav_imgs>li').eq([idx]).addClass('n_color')
        // 适应图片大小
        $('.m_box').width(imgw)
        $('.m_box').height(imgh)
        $('.list_imgs').width((imgw + 6) * 8)
        $('.list_imgs').height(imgh)

        // 点击列表换图
        $('.nav_imgs>li').on('click', function () {
            idx = $(this).index();
            $('.nav_imgs>li').eq([idx]).addClass('n_color').siblings().removeClass('n_color')
            $('.list_imgs>li').eq(idx).fadeIn('.3s').siblings().fadeOut()
        })

        // 点击下一张
        $('.c_right').click(function () {
            change(1);
        })

        // 点击上一张
        $('.c_left').click(function () {
            change(-1)
        })

        // 自动播放
        autoPlay = () => {
            timer = setInterval(function () {
                change(1);
            }, 5000)
        }
        // 改变图片的方法
        function change(num) {
            if (num === 1) {
                if (idx < 7) {
                    idx += num
                    $('.list_imgs>li').eq(idx).fadeIn('.3s').siblings().fadeOut()
                    change_Nav_Bgc($('.nav_imgs>li'));
                } else {
                    idx = 0;
                    $('.list_imgs>li').eq(idx).fadeIn('.3s').siblings().fadeOut()
                    change_Nav_Bgc($('.nav_imgs>li'));
                }
            } else if (num === -1) {
                if (idx > 0) {
                    idx += num
                    $('.list_imgs>li').eq(idx).fadeIn('.3s').siblings().fadeOut()
                    change_Nav_Bgc($('.nav_imgs>li'));
                } else {
                    idx = 7;
                    change_Nav_Bgc($('.nav_imgs>li'));
                    $('.list_imgs>li').eq(idx).fadeIn('.3s').siblings().fadeOut()
                }
            }
        }

        // 改变索引背景的方法
        function change_Nav_Bgc($nav_change) {
            $nav_change.eq([idx]).addClass('n_color').siblings().removeClass('n_color')
        }

        // 切换工具的显示&隐藏
        // 停止&开始动画
        $('.banner').mouseenter(function () {
            clearInterval(timer)
        })
        $('.banner').mouseleave(function () {

            autoPlay();
        })

        //  自动播放
        autoPlay();
    }
}