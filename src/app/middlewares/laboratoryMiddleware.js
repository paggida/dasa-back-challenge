const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const labFnc = require("../functions/laboratoryFunctions");
const valFnc = require("../functions/validationFunctions");

module.exports = {
  async store(req, res, next) {
    let invalidLabsIndex;
    let existentLabsIndex;

    if(Array.isArray(req.body)){
      invalidLabsIndex = await valFnc.getInvalidObjIndexInArray(req.body, labFnc.isValidNewLaboratoryObj);
      existentLabsIndex = await valFnc.getValidObjIndexInArray(req.body, labFnc.isExistentLaboratory);

      if(valFnc.isEmptyArray(invalidLabsIndex) && valFnc.isEmptyArray(existentLabsIndex)){
        return next();
      }
    }

    const position = valFnc.mergeArrayWithoutRepeatItem(invalidLabsIndex, existentLabsIndex);
    const { code, message} = e.throwException(5, apiExceptions);

    return res.status(code).json({ message, position });
  },
  async update(req, res, next) {
    let invalidLabsIndex = [];
    let existentLabsIndex;

    if(Array.isArray(req.body)){
      invalidLabsIndex = await valFnc.getInvalidObjIndexInArray(req.body, labFnc.isValidLaboratoryObj);

      if(valFnc.isEmptyArray(invalidLabsIndex)){
        existentLabsIndex = await valFnc.getValidObjIndexInArray(req.body, labFnc.isExistentLaboratoryById);
        const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
        const invalidPosition = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

        if(invalidPosition.length){
          const { code, message} = e.throwException(6, apiExceptions);
          return res.status(code).json({ message, position : invalidPosition });
        }else{
          return next();
        }
      }
    }

    const { code, message} = e.throwException(5, apiExceptions);
    return res.status(code).json({ message, position : invalidLabsIndex });
  },
  destroy(req, res, next){
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  }
};
