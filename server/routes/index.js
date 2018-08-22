var express = require('express');
var router = express.Router();
var User = require('../models/user')
//login
router.post('/login', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('用户名或密码不能为空')
  } else {
    User.findOne({
      username: req.body.username,
      password: req.body.password
    }, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        res.json(user)
      }
    })
  }

});

//register
router.post('/register', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('用户名或密码不能为空')
  } else {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) {
        console.log(err)
      } else if (user) {
        console.log('此用户已存在')
        res.json({msg:"此用户已存在"})
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password
        }, function (err) {
          if (err) {
            res.send(500)
            console.log(err)
          } else {
            res.send(200)
          }
        })

      }
    })
  }
})

module.exports = router;