// 注册、登录、退出
const express = require('express')
const User = require('../models/users')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('session数据----', req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {
  /**
   * 1. 获取表单数据
   * 2. 查询数据库用户名密码是否正确
   * 3. 发送响应数据
   */
  const body = req.body
  User.findOne({
    email: body.email,
    password: body.password
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        msg: err.message
      })
    }
    if (!data) {
      return res.status(200).json({
        err_code: 1,
        msg: '邮箱或密码不正确'
      })
    }

    // 登录成功，保存session
    req.session.user = data
    console.log('登录成功----', data)
    // 发送json格式的数据
    res.status(200).json({
      msg: '登录成功',
      err_code: 0
    })
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
  /**
   * 1.获取表单提交的数据
   * 2.操作数据库
   *  判断用户是否存在，如果已存在则不允许注册
   * 3. 发送响应
   */

  const requestData = req.body
  // console.log(req.body)
  User.findOne({ $or: [{ email: requestData.email }, { name: requestData.name }] }, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        msg: '服务端错误',
        err_code: 500
      })
    }
    console.log('已存在的数据---', data)
    if (data) {
      // 邮箱或昵称已存在
      return res.status(200).json({
        msg: '邮箱或昵称已存在',
        err_code: 1
      })
    }
    new User(requestData).save((err, data) => {
      if (err) {
        return res.status(500).json({
          msg: '服务端错误',
          err_code: 500
        })
      }
      // 注册成功，保存session
      req.session.user = data
      // 发送json格式的数据
      res.status(200).json({
        msg: '注册成功',
        err_code: 0
      })
    })
  })
})


router.get('/logout', (req, res) => {
  // 清除登录状态
  // 重定向到登录页
  req.session.user = null
  res.redirect('/login')
})
module.exports = router