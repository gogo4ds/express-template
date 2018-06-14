const homeController = require('../controllers/home-controller')

module.exports = app => {
  app.use('/', homeController)
}
