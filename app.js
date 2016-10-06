var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var routes = require('./routes/index')
var users = require('./routes/user')
var getticket = require('./routes/ticket')
var registration = require('./routes/registration')
var allUsers = require('./routes/allUsers')
var checkingGuests = require('./routes/checkingGuests')
var enteredUsers = require('./routes/enteredUsers')
var welcomeUser = require('./routes/welcomeUser')
var allCodes = require('./routes/allCodes')
var changeUser = require('./routes/changeUser')

var app = express()

var env = process.env.NODE_ENV || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env == 'development'

  // view engine setup

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(__dirname + '/public/img/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use('/', registration)
app.use('/users', users)
app.use('/getticket', getticket)
app.use('/registration', registration)
app.use('/allUsers', allUsers)
app.use('/checkingGuests', checkingGuests)
app.use('/enteredUsers', enteredUsers)
app.use('/welcomeUser', welcomeUser)
app.use('/allCodes', allCodes)
app.use('/changeUser', changeUser)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  })
})

module.exports = app
