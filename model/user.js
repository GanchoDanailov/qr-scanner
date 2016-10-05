/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose")
mongoose.connect('mongodb://gancho:Pragmatron@ds023074.mlab.com:23074/qr-scanner')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  global.db = mongoose.connection
  console.log('connected to the databasesss')

  console.log(global.db)
})

// create schema for blog post

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  invited: String,
  isEntered: {
    type: Boolean,
    default: false
  },
  email: String
})

// compile schema to model
module.exports = db.model('user', userSchema)
