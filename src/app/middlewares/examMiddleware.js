const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const examFnc = require("../functions/examFunctions");
const valFnc = require("../functions/validationFunctions");

module.exports = {
  async store(req, res, next) {
    let invalidExamsId;
    let existentExamsId;
    if(Array.isArray(req.body)){
      invalidExamsId = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidExamObj);
      existentExamsId = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExam);

      if(valFnc.isEmptyArray(invalidExamsId) && valFnc.isEmptyArray(existentExamsId)){
        return next();
      }
    }

    const position = valFnc.mergeArrays(invalidExamsId, existentExamsId);
    const { code, message} = e.throwException(5, apiExceptions);
    return res.status(code).json({ message, position });
  },
  update(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
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
  }
};
