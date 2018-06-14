const router = require('express').Router()

let getIndex = (req, res) => {
  res.render('index')
}

router
  .get('/', getIndex)
  .get('/home', getIndex)

module.exports = router
