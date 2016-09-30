var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var UserSchema = new Schema({
  name: {
    type: String
  }
})

var UserModel = mongoose.model('UserModel', UserSchema)
var User = require('../model/user')

var initUser = new User({
  name: 'test'
})
initUser.save(function(err) {

  if (err) {
    return err
  } else {
    console.log(initUser)
  }
})

/* GET users listing. */
router.post('/', function (req, res) {
  User.find({
    name: req.body.name
  }, function (err, user) {
    if (err) throw err
    if (user[0] === undefined) {
      var newUser = new User(req.body)
      newUser.save(function (err) {
        if (err) {
          return err
        } else {
          console.log('user saved' + newUser)
        }
      })
    } else {
      console.log('There is such user!' + user[0])
    }
  })
})

module.exports = router
