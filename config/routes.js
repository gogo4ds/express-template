const homeController = require('../controllers/home-controller')
const usersController = require('../controllers/users-controller')

module.exports = app => {
  app.use('/', homeController)
  app.use('/users', usersController)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
