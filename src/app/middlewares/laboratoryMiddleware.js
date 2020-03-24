const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const labFnc = require("../functions/laboratoryFunctions");
const valFnc = require("../functions/validationFunctions");

module.exports = {
  async store(req, res, next) {
    let invalidLabsId;
    let existentLabsId;

    if(Array.isArray(req.body)){
      invalidLabsId = await valFnc.getInvalidObjIndexInArray(req.body, labFnc.isValidLaboratoryObj);
      existentLabsId = await valFnc.getValidObjIndexInArray(req.body, labFnc.isExistentLaboratory);

      if(valFnc.isEmptyArray(invalidLabsId) && valFnc.isEmptyArray(existentLabsId)){
        return next();
      }
    }

    const position = valFnc.mergeArrayWithoutRepeatItem(invalidLabsId, existentLabsId);
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
  }
};
