const mongoose = require('mongoose')

const RelExamToLabSchema = new mongoose.Schema({
  laboratoryCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratory',
    required: true
  },
  examCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('RelExamToLab', RelExamToLabSchema)
