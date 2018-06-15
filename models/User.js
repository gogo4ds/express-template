const mongoose = require('mongoose')
const encryption = require('../utils/encryption')
const Role = require('./Role')

let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String }
})

userSchema.method({
  authenticate: function (password) {
    let inputPasswordHash = encryption.hashPassword(password, this.salt)
    let isSamePasswordHash = inputPasswordHash === this.passwordHash

    return isSamePasswordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdmin = () => {
  let username = 'admin'
  User
    .findOne({ username: username })
    .then(user => {
      if (!user) {
        Role
          .findOne({name: 'Admin'})
          .then(role => {
            let salt = encryption.generateSalt()
            let passwordHash = encryption.hashPassword('admin', salt)

            let user = {
              username: username,
              passwordHash: passwordHash,
              firstName: 'Admin',
              lastName: 'Adminov',
              salt: salt,
              roles: [ role.id ]
            }

            User
              .create(user)
              .then(user => {
                role.users.push(user.id)
                role.save(err => {
                  if (err) {
                    console.log(err.message)
                  } else {
                    console.log('Admin seeded successfully!')
                  }
                })
              })
          })
      }
    })
}
