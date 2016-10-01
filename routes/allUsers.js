var express = require('express')
var router = express.Router()
var User = require('../model/user')
/* GET home page. */

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) throw err
    console.log('obekt' + users)
    console.log('sled kato e prevurnat v string' + JSON.stringify(users))
    var str = JSON.stringify(users)
    res.render('allUsers', { allUsers: str })
  })
})

module.exports = router
