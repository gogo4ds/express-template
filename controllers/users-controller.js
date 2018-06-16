const router = require('express').Router()
const passport = require('passport')
const usersService = require('../services/usersService')

function getRegister (req, res) {
  return res.render('users/register')
}

async function postRegister (req, res) {
  try {
    let user = await usersService.register(req.body)

    req.logIn(user, (err, user) => {
      if (err) {
        res.locals.globalError = err
        return res.render('users/register', user)
      }

      req.session.successMessage = 'Registration successfull!'
      return res.redirect('/')
    })
  } catch (error) {
    res.locals.globalError = error.message
    const { username, firstName, lastName } = req.body
    return res.render('users/register', { username, firstName, lastName })
  }
}

function getLogin (req, res) {
  return res.render('users/login')
}

function postLogin (req, res, next) {
  const { username } = req.body
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.render('/', { globalError: err })
    }

    if (!user) {
      return res.status(409).render('users/login', { username, globalError: info.globalError })
    }

    req.login(user, (err, user) => {
      if (err) {
        return res.render('users/login', { username, globalError: err })
      }

      req.session.successMessage = `You successfully loggged in as ${username}!`
      return res.redirect('/')
    })
  })(req, res, next)
}

function logout (req, res) {
  req.logout()
  req.session.successMessage = 'You successfully loggged out!'
  return res.redirect('/')
}

router.route('/register')
  .get(getRegister)
  .post(postRegister)

router.route('/login')
  .get(getLogin)
  .post(postLogin)

router.route('/logout')
  .post(logout)

module.exports = router
