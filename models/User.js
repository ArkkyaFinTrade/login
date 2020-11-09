const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
   // required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userEmail: {
    type: String,
    required: true,
  },
 gender: {
    type: String,
   // required: true,
  },
  mobile: {
    type: String,
   // required: true,
  },  
  address: {
    type: String,
   // required: true,
  },
  bio: {
    type: String,
   // required: true,
  },

})

module.exports = mongoose.model('User', UserSchema)
