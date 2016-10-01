var express = require('express')
var router = express.Router()
var User = require('../model/user')
/* GET home page. */

router.get('/', function (req, res) {
  res.render('checkingGuests')
})

module.exports = router
