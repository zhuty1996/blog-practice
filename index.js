const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const routerSession = require('./routes/session')
const routerTopic = require('./routes/topic')

const app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html', require('express-art-template'))

// 在Express这个框架中，默认不支持 Session 和 Cookie
// 可以使用express-session来解决

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * 添加session成员： req.session.foo = 'bar'
 * 查看session成员： req.session.foo
 */
app.use(session({
  secret: 'keyboard cat', //配置加密字符串，会在原有加密基础上和这个字符串拼起来去加密，增加安全性，防止客户端伪造
  resave: false,
  saveUninitialized: true //无论是否使用session，都默认分配 
}))

app.use(routerSession)
app.use(routerTopic)

// 配置一个处理 404 的中间件
app.use((req, res) => {
  res.send('404')
})

// 配置一个全局错误处理的中间件
app.use((err, req, res, next)=>{
  res.status(500).send('err,500')
})


app.listen(3366, () => {
  console.log('http://localhost:3366/')
})
