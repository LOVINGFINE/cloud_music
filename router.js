
let express = require('express')

router = express.Router()
// 首页
router.get('/', function (req, res) {
     res.render('index.html')
})
router.get('/index_recommend.html', function (req, res) {
     res.render('index_recommend.html')
})
//榜单页
router.get('/index_rankinglist.html', function (req, res) {
     res.render('index_rankinglist.html')
})
// 歌单页
router.get('/index_musiclist.html', function (req, res) {
     res.render('index_musiclist.html')
})
// 电台页
router.get('/index_DJstation.html', function (req, res) {
     res.render('index_DJstation.html')
})

//歌手页
router.get('/index_vocalist.html', function (req, res) {
     res.render('index_vocalist.html')
})

// 专辑页
router.get('/index_newAlbum.html', function (req, res) {
     res.render('index_newAlbum.html')
})

// 歌曲详情页
router.get('/song_window.html', function (req, res) {
     res.render('song_window.html')
})
// 歌单详情页
router.get('/musicListDetail.html', function (req, res) {
     res.render('musicListDetail.html')
})
// 搜索页
router.get('/search.html', function (req, res) {
     res.render('search.html')
})

module.exports = router
