const router = require('express').Router()

let getRegister = (req, res) => {
  res.render('account/register')
}

router
  .get('/register', getRegister)

module.exports = router
