var express = require('express')
var router = express.Router()
var Code = require('../model/code')
  /* GET all user page. */

router.get('/', function (req, res) {
  res.render('allCodesForm')
})
router.post('/', function (req, res) {
  var pass = req.body.password
  if (pass === 'Solarstone1234') {
    Code.find({}, function (err, code) {
      if (err) throw err
      //var str = JSON.stringify(users)
      console.log(code)
      var str = JSON.stringify(code)
      res.render('allCodes', { allCodes: str })
    })
  }
})

module.exports = router
