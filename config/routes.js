const homeController = require('../controllers/home-controller')
const accountController = require('../controllers/account-controller')

module.exports = app => {
  app.use('/', homeController)
  app.use('/account', accountController)
}
