let arr = [1, 100, 10, 1014, 1006, 1000, 1009, 1002]
var types = []
var keywordsHash = null

function setHash(key) {
    $('#search_input').val(key)
    keywordsHash = key
    
}

function getSearchType(type, offset) {
    getSearchData(type, keywordsHash, offset)
    let i = arr.findIndex(ele => {
        return ele == type
    })
    $('.search_navItem').eq(i).addClass("navItem_change").siblings("li").removeClass("navItem_change")

}

// 搜索结果数据
function getSearchData(type, key, offset) {
    $.ajax({
        url: `${API}/search?keywords=${key}&type=${type}&offset=${offset*30}`,
        type: 'get',
        async: true,
        dataType: 'json',
        success: res => {
            // console.log(res);
            
            let data = res.result
            $('#search_tagart').html(key)
            setSeachRes(type, data)
        }
    })
}

function templateGetSet(res, type) {
    let list = template(`search_template-${type}`, res)
    $('#search_bodyOne').html(list)
}

function getPageNum(type, offset,e) {
    $(e).addClass('pageRed').siblings('.pageNumber').removeClass('pageRed')
    $.ajax({
        url: `${API}/search?keywords=${keywordsHash}&type=${type}&offset=${offset}`,
        type: 'get',
        dataType: 'json',
        success: res => {
            let data = res.result
            templateGetSet(data, type)
        }

    })
}

function setPage(key, type, number) {
    // console.log(number);
    
    if (number > 30) {
        let p = parseInt(number / 30) + 1
        $('#get_changeNext,#get_changePrev').show()
        for (var i = 0; i < p; i++) {
            if (i < 9) {
                $('#pageNumber').append(` <a href="/#/get?key=${key}&type=${type}&offset=${i}" class="pageNumber" onclick="getPageNum(${type},${i+1},this)">${i+1}</a>`)
            } else if (i === p - 1) {
                $('#pageNumber').append(`<span class="dots">...</span>`)
                $('#pageNumber').append(` <a href="/#/get?key=${key}&type=${type}&offset=${i}" class="pageNumber" onclick="getPageNum(${type},${i+1},this)">${i+1}</a>`)
            } 
            $('#pageNumber').append(` <a href="/#/get?key=${key}&type=${type}&offset=${i}" class="pageNumber pageHide" onclick="getPageNum(${type},${i+1},this)">${i+1}</a>`)
        }
    }


}

function setSeachRes(type, data) {
    let num = null
    if (type == 1) {
        num = data.songCount
        $('#search_result_p').html(`<i id="search_number">${data.songCount}</i>首歌曲</span>`)
    } else if (type == 100) {
        num = data.artistCount
        $('#search_result_p').html(`<i id="search_number">${data.artistCount}</i>位歌手</span>`)
    } else if (type == 10) {
        num = data.albumCount
        $('#search_result_p').html(`<i id="search_number">${data.albumCount}</i>张专辑</span>`)

    } else if (type == 1014) {
        num = data.videoCount
        $('#search_result_p').html(`<i id="search_number">${data.videoCount}</i>个视频</span>`)

    } else if (type == 1006) {
        num = data.songCount
        $('#search_result_p').html(`<i id="search_number">${data.songCount}</i>个歌词</span>`)

    } else if (type == 1000) {
        num = data.playlistCount
        $('#search_result_p').html(`<i id="search_number">${data.playlistCount}</i>个歌单</span>`)

    } else if (type == 1009) {
        num = data.djRadiosCount
        $('#search_result_p').html(`<i id="search_number">${data.djRadiosCount}</i>个电台</span>`)

    } else if (type == 1002) {
        num = data.userprofileCount
        $('#search_result_p').html(`<i id="search_number">${data.userprofileCount}</i>个用户</span>`)
    }
// console.log(num);

    if (num < 30) {
        $.ajax({
            url: `${API}/search?keywords=${keywordsHash}&type=${type}`,
            type: 'get',
            async: true,
            dataType: 'json',
            success: res => {
                $('#pageNumber').empty()
                $('#get_changeNext,#get_changePrev').hide()
                templateGetSet(res.result, type)
            }
        })
    } else {
        $('#pageNumber').empty()
        $('#get_changeNext,#get_changePrev').hide()
        templateGetSet(data, type)
        setPage(keywordsHash, type, num)
    }
}