// 不支持ES6语法，不要用import
var mongoose= require('mongoose')

var userSchema=new mongoose.Schema({
  username:String,
  password:String
})

module.exports=mongoose.model('User',userSchema)