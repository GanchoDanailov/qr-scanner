var express = require('express')
var router = express.Router()
var User = require('../model/user')
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
  var obj = JSON.parse(dec)
  return obj
}

// TODO its seems we dont need it

var initUser = new User({
  firstName: 'Gancho',
  lastName: 'Danailov',
  email: 'test-email@abv.bg'
})

initUser.save(function (err) {
  if (err) {
    return err
  } else {
    console.log(initUser)
  }
})

/* GET users listing. */
router.post('/', function (req, res) {
  User.find({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err
    if (user[0] === undefined) {
      var newUser = new User(req.body)
      newUser.save(function (err) {
        if (err) {
          return err
        } else {
          console.log('user saved' + newUser)
          var cryptString = {
            'firstName': newUser.firstName,
            'lastName': newUser.lastName,
            'email': newUser.email
          }
          var hw = encrypt(JSON.stringify(cryptString))
          console.log('kriptirano: ' + hw)
          console.log('dekriptirano: ' + decrypt(hw).firstName)
          req.session.cryptString = hw
          res.redirect('/getticket')
          res.end()
        }
      })
    } else {
      console.log('There is such user!' + user[0])
      res.end()
    }
  })
})

module.exports = router
