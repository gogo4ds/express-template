const homeController = require('../controllers/home-controller')
const accountController = require('../controllers/account-controller')

module.exports = app => {
  app.use('/', homeController)
  app.use('/account', accountController)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
