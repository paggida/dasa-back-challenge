const Exam = require("../models/Exam")

module.exports = {
  isValidNewExamObj(obj){
    return (obj.name && obj.examTypeCode)? true : false;
  },
  isValidExamObj(obj){
    return ((obj.name || obj.examTypeCode || obj.examTypeCode || obj.status || !obj.status) && obj.id )? true : false;
  },
  async isExistentExam({name, examTypeCode}){
    const response = await Exam.findOne({ name, examTypeCode })
    return response? true : false;
  },
  async isExistentExamById({ id }){
    const response = await Exam.findById(id);
    return response? true : false;
  }
};

