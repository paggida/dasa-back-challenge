const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
  description: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Type', TypeSchema)
