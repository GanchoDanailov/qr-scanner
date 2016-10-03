var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function (req, res) {
  var user = req.session.user || 'empty'
  var firstName = user.firstName || 'First name'
  var lastName = user.lastName || 'Last name'
  var email = user.email || 'Email'
  res.render('welcomeUser', {user: {firstName: firstName, lastName: lastName, email: email }})
})

module.exports = router
