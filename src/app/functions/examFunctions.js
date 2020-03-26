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
  },
  isChangedToActive(exam){
    return exam.status? true : false;
  },
  arethereLinkedLaboratories(exam){
    if(exam.laboratoryCode){
        return exam.laboratoryCode.length > 0;
    }
    return false;
  },
  isActiveExam(exam){
    return exam.status;
  },
  async getInactiveExamObjIndexInObjExamArray(examsArray){
    let inactiveExams = [];

    for (const [index, changedExam] of examsArray.entries()) {
      if(!this.isChangedToActive(changedExam) && this.arethereLinkedLaboratories(changedExam)){
        const originalExam = await Exam.findById(changedExam.id);
        if(!this.isActiveExam(originalExam)){
          inactiveExams.push(index);
        };
      };
    };

    return inactiveExams;
  }
};

