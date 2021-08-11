const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//连接数据库
mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser: true 
})

//创建Schema对象（约束）
const topicSchema = new Schema({
  block_part: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  create_time: {
    type: Date,
    // 注意： 这里不要写Date.now()，因为在创建Schema的时候会立即调用
    default: Date.now
  },
  
})

//将userSchema映射到一个MongoDB collection并定义这个文档的构成
module.exports = mongoose.model('Topic', topicSchema)
