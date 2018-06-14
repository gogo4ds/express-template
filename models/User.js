const mongoose = require('mongoose')
const encryption = require('./utils/encryption')

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

}
