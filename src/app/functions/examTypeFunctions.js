const ExamType = require("../models/ExamType");
const valFnc   = require("../functions/validationFunctions");

module.exports = {
  async initializeDatabase(){
    const examTypes = await ExamType.find();
    const defaultExamType = ExamType.getDefaultExamTypes();

    if(examTypes.length !== defaultExamType.length){
      if(!valFnc.isEmptyArray(examTypes)) ExamType.remove({})
      for (let description of defaultExamType) await ExamType.create({ description });
    }
  },
  async isExistentExamTypeById({ id }){
    const response = await ExamType.findById(id);
    return response? true : false;
  },
  isValidExamTypeCode(examTypeCode){
    return (examTypeCode)? true : false;
  },
  async getInvalidExamTypeObjIndexInObjExamArray(examsArray){
    let validExamTypeCodes = [];
    let invalidIndex = [];


    const validatedExamsArray = examsArray
      .map((item, index)=> valFnc.setIndexArrayAttributeInArrayByItem(item, index))
      .filter(exam=> this.isValidExamTypeCode(exam.examTypeCode));

    if(!validatedExamsArray.length) return examsArray.map((exam, index)=>index);

    for (let exam of validatedExamsArray) {
      if(validExamTypeCodes.indexOf(exam.examTypeCode) < 0){
        if(!await this.isExistentExamTypeById({ id : exam.examTypeCode })){
          invalidIndex.push(exam.indexArray);
        }else{
          validExamTypeCodes.push(exam.examTypeCode)
        };
      }
    };

    return invalidIndex;
  }
}
