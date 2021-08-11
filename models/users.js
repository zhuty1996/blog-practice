const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//连接数据库
mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser: true 
})

//创建Schema对象（约束）
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    // 注意： 这里不要写Date.now()，因为在创建Schema的时候会立即调用
    default: Date.now
  },
  last_modify_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-max-img.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [0,1,-1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有限制
    // 1不可以评论 
    // 2不可以登录
    enum: [0,1,2],
    default: 0
  }
})

//将userSchema映射到一个MongoDB collection并定义这个文档的构成
module.exports = mongoose.model('User',userSchema)
