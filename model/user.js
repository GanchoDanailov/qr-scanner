/*
* More details here http://mongoosejs.com/docs/guide.html
*/
var mongoose = require('mongoose')
var db = mongoose.connection

// create schema for blog post

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  invited: String,
  code: String,
  isEntered: {
    type: Boolean,
    default: false
  },
  email: String
})

// compile schema to model
module.exports = db.model('user', userSchema)
