const Laboratory    = require("../models/Laboratory");
const apiExceptions = require("../Exceptions/apiExceptions");
const e             = require("../functions/exceptionFunctions");
const labFnc        = require("../functions/laboratoryFunctions");
const valFnc        = require("../functions/validationFunctions");
const ctrlFnc       = require("../functions/controllersFunctions");

module.exports = {
  async show(req, res, next) {
    const { labId }  = req.params;

    const laboratory = await Laboratory.findById(labId);

    if(!laboratory){
      // 404 - Action canceled! Laboratory not found
      const { code, message } = e.throwException(4, apiExceptions);
      return res.status(code).json({ message });
    }

    req.laboratory = laboratory;

    return next();
  },
  async store(req, res, next) {
    let invalidLabsIndex;
    let existentLabsIndex;

    if(Array.isArray(req.body)){
      invalidLabsIndex  = await valFnc.getInvalidObjIndexInArray(req.body, labFnc.isValidNewLaboratoryObj);
      existentLabsIndex = await valFnc.getValidObjIndexInArray(req.body, labFnc.isExistentLaboratory);

      if(valFnc.isEmptyArray(invalidLabsIndex) && valFnc.isEmptyArray(existentLabsIndex)){
        return next();
      }
    }

    const positions = valFnc.mergeArrayWithoutRepeatItem(invalidLabsIndex, existentLabsIndex);
    // 405 - Action canceled! Invalid input at positions:
    const { code, message} = e.throwException(5, apiExceptions);

    return res.status(code).json({ message, positions });
  },
  async update(req, res, next) {
    let invalidLabsIndex = [];
    let existentLabsIndex;

    if(Array.isArray(req.body)){
      invalidLabsIndex = await valFnc.getInvalidObjIndexInArray(req.body, labFnc.isValidLaboratoryObj);

      if(valFnc.isEmptyArray(invalidLabsIndex)){
        existentLabsIndex        = await valFnc.getValidObjIndexInArray(req.body, labFnc.isExistentLaboratoryById);
        const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
        const invalidPositions    = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

        if(invalidPositions.length){
          // 404 - Action canceled! Laboratory not found at positions:
          const { code, message} = e.throwException(7, apiExceptions);
          return res.status(code).json({ message, positions : invalidPositions });
        }else{
          return next();
        }
      }
    }
    // 405 - Action canceled! Invalid input at positions:
    const { code, message} = e.throwException(5, apiExceptions);
    return res.status(code).json({ message, positions : invalidLabsIndex });
  },
  async destroy(req, res, next){
    const { labsIds }        = req.params;
    const requestDeletedLabs = ctrlFnc.getIdsArrayByStream(labsIds, "|");
    const deletedlabsIds     = valFnc.convertStringToIdObj(requestDeletedLabs);
    const positionsInRequest = valFnc.getAllPositionsInArray(deletedlabsIds);
    const existentLabsIndex  = await valFnc.getValidObjIndexInArray(deletedlabsIds, labFnc.isExistentLaboratoryById);
    const invalidPositions    = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

    if(invalidPositions.length){
      // 404 - Action canceled! Laboratory not found at positions:
      const { code, message} = e.throwException(7, apiExceptions);
      return res.status(code).json({ message, positions : invalidPositions });
    }else{
      req.deletedLabs = requestDeletedLabs;
      return next();
    }
  }
};
