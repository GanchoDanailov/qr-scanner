var express = require('express')
var router = express.Router()
var User = require('../model/user')
  /* GET all user page. */

router.get('/:id', function (req, res) {
  var id = req.params.id
  User.findById(id, function (err, obj) {
    var user = obj || 'empty'
    var firstName = user.firstName || 'First name'
    var lastName = user.lastName || 'Last name'
    var email = user.email || 'Email'
    var isEntered = obj.isEntered
    req.session.user = obj
    User.update({_id: id}, {
      isEntered: !isEntered
    },function (err, numberAffected, rawResponse) {
      console.log('User found and updated')
      if(isEntered){
        res.redirect('/allUsers')
      }else{
        res.redirect('/welcomeUser')
      }
    })
  })
})

module.exports = router
