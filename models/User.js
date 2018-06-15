const mongoose = require('mongoose')
const encryption = require('../utils/encryption')
const Role = mongoose.model('Role')

let userSchema = mongoose.Schema({
  username: { type: String, required: [ true, 'The username is required' ], unique: [ true, 'Such username already exists' ] },
  firstName: { type: String },
  lastName: { type: String },
  salt: { type: String, required: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
})

userSchema.method({
  authenticate: function (password) {
    let inputPasswordHash = encryption.generateHashedPassword(password, this.salt)
    let isSamePasswordHash = inputPasswordHash === this.passwordHash

    return isSamePasswordHash
  },

  isInRole: function (roleName) {
    return Role.findOne({name: roleName}).then(role => {
      if (!role) {
        return false
      }

      let isInRole = this.roles.indexOf(role.id) !== -1
      return isInRole
    })
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
            let passwordHash = encryption.generateHashedPassword('admin', salt)

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
