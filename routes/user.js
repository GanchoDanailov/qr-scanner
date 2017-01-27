var express = require('express')
var router = express.Router()
var User = require('../model/user')
var Code = require('../model/code')
var email = require('../routes/email')
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
function createCryptedObj (req, obj) {
  var cryptString = {
    'firstName': obj.firstName,
    'lastName': obj.lastName,
    'email': obj.email
  }
  var hw = encrypt(JSON.stringify(cryptString))
  return hw
  // req.session.cryptString = hw
  // console.log('encrypted string created !')
}

// var randomFixedInteger = function (length) {
//   return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1))
// }
// function createRandomCode (total, length) {
//   for (var i = 0; i < total; i++) {
//     var randomNumber = randomFixedInteger(length)
//     var newCode = new Code({
//       code: randomNumber,
//       isUsed: false
//     })
//     newCode.save(function (err) {
//       if (err) throw err
//       console.log('Code saved successfully!')
//     })
//   }
// }
// //generate random umbers
// createRandomCode(99, 6)

/* GET users listing. */
router.post('/', function (req, res) {
  User.find({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err
    Code.find({
      code: req.body.code
    }, function (err, code) {
      if (err) throw err
      if (code[0] === undefined) {
        res.render('registrationForm', { code: 'Invalid code' })
      } else if (code[0].isUsed) {
        res.render('registrationForm', {code: 'this code is already used'})
      } else {
        if (user[0] === undefined) {
          var newUser = new User(req.body)
          newUser.save(function (err) {
            if (err) throw err
            console.log(code[0].code)

            if (code[0].code !== 'IBM2017') {
              Code.update({code: req.body.code}, {
                isUsed: 'true'
              }, function (err, numberAffected, rawResponse) {
                if (err) throw err
              })
            }

            email(createCryptedObj(req, newUser), newUser)
            res.redirect('/users/successRegistration')
            res.end()
          })
        } else {
          req.session.userExist = user[0]
          res.redirect('/users/userExist')
          res.end()
        }
      }
    })
  })
})
router.get('/userExist', function (req, res) {
  var user = req.session.userExist || 'empty'
  var email = user.email || 'Email'
  res.render('userExist', {user: {email: email}})
})

router.get('/successRegistration', function (req, res) {
  res.render('successRegistration')
})

module.exports = router
