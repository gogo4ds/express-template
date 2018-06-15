const router = require('express').Router()
const encryption = require('../utils/encryption')
const passport = require('passport')
const User = require('mongoose').model('User')

function getRegister (req, res) {
  return res.render('account/register')
}

function postRegister (req, res) {
  const { username, firstName, lastName, password, repeatPassword } = req.body

  if (!password) {
    res.locals.globalError = 'Password is required'
    return res.render('account/register', { username, firstName, lastName })
  }

  if (password !== repeatPassword) {
    res.locals.globalError = 'Passwords do not match'
    return res.render('account/register', { username, firstName, lastName })
  }

  let salt = encryption.generateSalt()
  let passwordHash = encryption.generateHashedPassword(salt, password)

  User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    salt: salt,
    passwordHash: passwordHash
  }).then(user => {
    req.logIn(user, (err, user) => {
      if (err) {
        res.locals.globalError = err
        return res.render('account/register', user)
      }

      return res.redirect('/')
    })
  }).catch(err => {
    res.locals.globalError = err
    return res.render('account/register', { username, firstName, lastName })
  })
}

function getLogin (req, res) {
  return res.render('account/login')
}

function postLogin (req, res, next) {
  const { username } = req.body
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.render('/', { globalError: err })
    }

    if (!user) {
      return res.status(409).render('account/login', { username, globalError: info.globalError })
    }

    req.login(user, (err, user) => {
      if (err) {
        return res.render('account/login', { username, globalError: err })
      }

      return res.redirect('/')
    })
  })(req, res, next)
}

function logout (req, res) {
  req.logout()
  return res.redirect('/')
}

router.route('/register')
  .get(getRegister)
  .post(postRegister)

router.route('/login')
  .get(getLogin)
  .post(postLogin)

router.route('/logout')
  .get(logout)

module.exports = router
