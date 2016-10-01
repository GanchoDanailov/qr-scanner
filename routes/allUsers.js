var express = require('express')
var router = express.Router()
var User = require('../model/user')
/* GET home page. */

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err
    res.render('allUsers', { title: users[0].email })
  })
})

module.exports = router
