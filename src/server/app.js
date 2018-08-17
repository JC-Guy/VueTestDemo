var express = require('express')
var app = express()
var router = require('./router/user')
bodyparser = require('body-parser')
var mongoose = require('mongoose')
app.use(bodyparser.json()) //只解析json
app.use(bodyparser.urlencoded({
  extended: false
}))

//配置跨域，解决’Access-Control-Allow-Origin’跨域问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
//配置跨域，解决’Access-Control-Allow-Origin’跨域问题
var url = "mongodb://localhost:27017/test"
app.use('/users', router) //将路由注册到/users
mongoose.connect(url, (err) => {

  if (err) {
    console.log(err)
  } else {
    console.log("db connect success!")
  }
})

var port = process.env.PORT || 3000
app.listen(port)
console.log('app监听端口：' + port)
