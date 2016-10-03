var express = require('express')
var router = express.Router()
var User = require('../model/user')
/* GET home page. */
var crypto = require('crypto')
var algorithm = 'aes-256-ctr'
var password = 'solarstone'

function encrypt (text) {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')

  console.log('ot dekr fnnnnn: ' + dec )
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
  }, function (err, numberAffected, rawResponse) {
     console.log('nameren i updeitnat')
  })
  res.send({redirect: '/welcomeUser'})
})

module.exports = router
