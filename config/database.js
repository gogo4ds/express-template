const mongoose = require('mongoose')

module.exports = config => {
  mongoose.connect(
    config.connectionString,
    err => {
      if (err) {
        console.log(err)
        return
      }

      console.log('MongoDb Up and running...')
    })
}
