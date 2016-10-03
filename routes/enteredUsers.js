var express = require('express')
var router = express.Router()
var User = require('../model/user')
  /* GET all users that are loged inside page. */

router.get('/', function (req, res) {
  User.find({
    'isEntered': {
      $ne: false
    }
  }, function (err, users) {
    if (err) throw err
    var str = JSON.stringify(users)
    res.render('allUsers', { allUsers: str })
  })
})

module.exports = router
