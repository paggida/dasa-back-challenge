const ExamType = require("../models/ExamType");
const valFnc   = require("../functions/validationFunctions");

module.exports = {
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
      .filter(({ examTypeCode })=> this.isValidExamTypeCode(examTypeCode));

    for (let { indexArray, examTypeCode: id } of validatedExamsArray) {
      if(validExamTypeCodes.indexOf(id) < 0){
        if(!await this.isExistentExamTypeById({ id })){
          invalidIndex.push(indexArray);
        }else{
          validExamTypeCodes.push(id)
        };
      }
    };

    return invalidIndex;
  }
}
