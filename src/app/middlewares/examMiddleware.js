const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const examFnc = require("../functions/examFunctions");
const valFnc = require("../functions/validationFunctions");

module.exports = {
  async store(req, res, next) {
    let invalidExamsIndex = [];
    let existentExamsIndex = [];

    if(Array.isArray(req.body)){
      invalidExamsIndex = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidNewExamObj);
      existentExamsIndex = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExam);

      if(valFnc.isEmptyArray(invalidExamsIndex) && valFnc.isEmptyArray(existentExamsIndex)){
        return next();
      }
    }

    const position = valFnc.mergeArrayWithoutRepeatItem(invalidExamsIndex, existentExamsIndex);
    const { code, message} = e.throwException(5, apiExceptions);

    return res.status(code).json({ message, position });
  },
  async update(req, res, next) {
    let invalidExamsIndex = [];
    let existentExamsIndex;

    if(Array.isArray(req.body)){
      invalidExamsIndex = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidExamObj);

      if(valFnc.isEmptyArray(invalidExamsIndex)){
        existentExamsIndex = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExamById);
        const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
        const invalidPosition = valFnc.getDifferentItemsInArrays(existentExamsIndex, positionsInRequest);

        if(invalidPosition.length){
          const { code, message} = e.throwException(6, apiExceptions);
          return res.status(code).json({ message, position : invalidPosition });
        }else{
          return next();
        }
      }
    }

      const { code, message} = e.throwException(5, apiExceptions);
      return res.status(code).json({ message, position : invalidExamsIndex });
  },
  destroy(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  linkLaboratory(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  unlinkLaboratory(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  getLabsByExamName(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  }
};
