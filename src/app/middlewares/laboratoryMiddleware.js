const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const labFnc = require("../functions/laboratoryFunctions");
const valFnc = require("../functions/validationFunctions");
const ctrlFnc = require("../functions/controllersFunctions");

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
          const { code, message} = e.throwException(7, apiExceptions);
          return res.status(code).json({ message, position : invalidPosition });
        }else{
          return next();
        }
      }
    }

    const { code, message} = e.throwException(5, apiExceptions);
    return res.status(code).json({ message, position : invalidLabsIndex });
  },
  async destroy(req, res, next){
    const { labsIds } = req.params;
    const requestDeletedLabs = ctrlFnc.getIdsArrayByStream(labsIds, "|");
    const deletedlabsIds = valFnc.convertStringToIdObj(requestDeletedLabs);
    const positionsInRequest = valFnc.getAllPositionsInArray(deletedlabsIds);
    const existentLabsIndex = await valFnc.getValidObjIndexInArray(deletedlabsIds, labFnc.isExistentLaboratoryById);
    const invalidPosition = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

    if(invalidPosition.length){
      const { code, message} = e.throwException(7, apiExceptions);
      return res.status(code).json({ message, position : invalidPosition });
    }else{
      return next();
    }
  }
};
