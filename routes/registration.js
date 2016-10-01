var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function(req, res) {
  res.render('registrationForm', { title: 'Tranc3motion' })
})

module.exports = router
