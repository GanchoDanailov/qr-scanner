/*
* More details here http://mongoosejs.com/docs/guide.html
*/
var mongoose = require('mongoose')
var db = mongoose.connection

// create schema for code

var code = new mongoose.Schema({
  code: String,
  isUsed: {
    type: Boolean,
    default: false
  }
})

// compile schema to model
module.exports = db.model('code', code)
