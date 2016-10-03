var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function (req, res) {
  var user = req.session.user || 'empty'
  var email = user.email || 'Email'
  res.render('userExist', {user: {email: email}})
})

module.exports = router
