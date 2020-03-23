const Exam = require("../models/Exam")

module.exports = {
  isValidExamObj(obj){
    return (obj.name && obj.examTypeCode)? true : false;
  },
  async isExistentExam({name, examTypeCode}){
    const response = await Exam.findOne({ name, examTypeCode })
    return response? true : false;
  }
};

