const mongoose = require('mongoose');
const defaultExamTypes =  [ "Análise clínica", "Imagem" ];

const ExamTypeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ExamTypeSchema.statics = {
  getDefaultExamTypes () {
    return defaultExamTypes;
  }
}

module.exports = mongoose.model('ExamType', ExamTypeSchema)
