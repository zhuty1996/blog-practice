// 新建、修改、删除话题、查看话题列表
const express = require('express')
const Topic = require('../models/topic')

const router = express.Router()

/**
 * 新增话题
 */
router.get('/topics/new', (req, res) => {
  res.render('topic/new.html')
})

router.post('/topics/new', (req, res) => {
  const body = req.body
  new Topic(body).save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: '服务端错误',
        err_code: 500
      })
    }
    // 发送json格式的数据
    res.status(200).json({
      msg: '注册成功',
      err_code: 0
    })
  })
})

module.exports = router