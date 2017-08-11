var express = require('express')
var router = express.Router()
var Code = require('../model/code')
  /* GET all user page. */

router.get('/', function (req, res) {
  res.render('allCodesForm')
})
router.post('/', function (req, res) {
  var pass = req.body.password
  if (pass === 'Nifra2017') {
    Code.find({}).sort({ isUsed: 1 }).exec((err, code) => {
      if (err) res.send(err)
      // var str = JSON.stringify(users)
      console.log(code)
      var str = JSON.stringify(code)
      res.render('allCodes', { allCodes: str })
    })
  }
})

module.exports = router
