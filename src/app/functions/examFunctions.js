const Exam = require("../models/Exam")

module.exports = {
  isValidExamObj(obj){
    return (obj.name && obj.typeCode)? true : false;
  },
  async isExistentExam({name, typeCode}){
    const response = await Exam.findOne({ name, typeCode })
    return response? true : false;
  }
};

