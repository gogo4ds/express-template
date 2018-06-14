const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
  name: { type: String, required: true },
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role

module.exports.initialize = () => {
  Role
    .findOne({name: 'Admin'})
    .then(role => {
      if (!role) {
        Role.create({name: 'Admin'})
      }
    })
}
