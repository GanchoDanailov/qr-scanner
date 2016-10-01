var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  var cryptString = req.session.cryptString
  res.render('generatedQR', { cryptedQRString: cryptString })
})

module.exports = router
