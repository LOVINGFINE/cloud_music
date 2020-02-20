const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('./util/request')
const cache = require('apicache').middleware
const router = require('./router')
const app = express()

app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')))
app.use('/public/', express.static(path.join(__dirname, '/public/')))
app.use('/lib/', express.static(path.join(__dirname, '/lib/')))
app.engine('html', require('express-art-template'))
// CORS & Preflight request
app.use((req, res, next) => {
  if(req.path !== '/' && !req.path.includes('.')){
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
  req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
    let crack = pair.indexOf('=')
    if(crack < 1 || crack == pair.length - 1) return
    req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
  })
  next()
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}

fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
  if(!file.endsWith('.js')) return
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let question = require(path.join(__dirname, 'module', file))

  app.use(route, (req, res) => {
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies})
    question(query, request)
      .then(answer => {
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.body.code == '301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  })
})
app.use(router)


app.server = app.listen(3001,() => {
  console.log(`server running @ http://localhost:3001`)
})

module.exports = app
