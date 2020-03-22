const mongoose = require('mongoose');

const LaboratorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

LaboratorySchema.pre('save', (next) => {
  if (!this.status) {
    this.status = true;
  }
  return next()
})

module.exports = mongoose.model('Laboratory', LaboratorySchema)
