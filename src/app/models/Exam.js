const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  examTypeCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamType',
    required: true
  },
  laboratoryCode:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Laboratory',
  }],
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
