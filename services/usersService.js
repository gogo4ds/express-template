const User = require('mongoose').model('User')
const encryption = require('../utils/encryption')

async function register (user) {
  const { username, firstName, lastName, password, repeatPassword } = user

  if (!password) {
    throw new Error('Password is required')
  }

  if (password !== repeatPassword) {
    throw new Error('Passwords do not match')
  }

  let salt = encryption.generateSalt()
  let passwordHash = encryption.generateHashedPassword(password, salt)

  try {
    return await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      salt: salt,
      passwordHash: passwordHash
    })
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('User with the same username already exists! Please choose another username.')
    }

    throw new Error(error.message)
  }
}

module.exports = {
  register
}
