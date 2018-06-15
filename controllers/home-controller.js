const router = require('express').Router()
const messages = require('../utils/notification')

let getIndex = (req, res) => {
  let message = messages.tryGetSuccessMessage(req)
  res.render('index', { successMessage: message })
}

router
  .get('/', getIndex)
  .get('/index.html', getIndex)

module.exports = router
