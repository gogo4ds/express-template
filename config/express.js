const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = app => {
  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
  }))

  app.set('view engine', 'hbs')

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

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user

      req.user.isInRole('Admin').then(isAdmin => {
        res.locals.currentUser.isAdmin = isAdmin
      })
    }

    next()
  })

  app.use(express.static(path.join(__dirname, '../content')))
}
