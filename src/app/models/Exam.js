const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  typeCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
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

ExamSchema.pre('save', (next) => {
  if (!this.status) {
    this.status = true;
  }
  return next()
})

module.exports = mongoose.model('Exam', ExamSchema)
