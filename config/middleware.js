const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = app => {
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(cookieParser())

  app.use(session({
    secret: 'keyboard kat -0!',
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(express.static(path.join(__dirname, '../content')))
}
