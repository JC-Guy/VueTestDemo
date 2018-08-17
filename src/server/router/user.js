var express = require('express')
var router=express.Router()

var User=require('../models/user')

router.route('/validate').post((req,res)=>{
  User.findOne({name:req.body.name,password:req.body.password},(err,user)=>{
    if(err){
      console.log(err)
      res.send('用户名或密码错误')
    }else{
      // res.send('登陆成功')
      res.json(user)
    }  
  })
})  


module.exports=router