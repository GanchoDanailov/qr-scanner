var express = require('express')
var router = express.Router()
var User = require('../model/user')
/* GET home page. */
var crypto = require('crypto')
var algorithm = 'aes-256-ctr'
var password = 'solarstone'

function decrypt (text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  var obj = JSON.parse(dec)
  return obj
}

router.get('/', function (req, res) {
  res.render('checkingGuests')
})

router.post('/', function (req, res) {
  var obj = decrypt(req.body.str)
  req.session.user = obj
  var email = obj.email
  User.update({email: email}, {
    isEntered: 'true'
  },function (err, numberAffected, rawResponse) {
    console.log('User found and updated')
  })
  res.send({redirect: '/welcomeUser'})
})

module.exports = router
