const Exam          = require("../models/Exam");
const apiExceptions = require("../Exceptions/apiExceptions");
const e             = require("../functions/exceptionFunctions");
const examFnc       = require("../functions/examFunctions");
const examTypeFnc   = require("../functions/examTypeFunctions");
const labFnc        = require("../functions/laboratoryFunctions");
const valFnc        = require("../functions/validationFunctions");
const ctrlFnc       = require("../functions/controllersFunctions");

module.exports = {
  async show(req, res, next) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate(["examTypeCode","laboratoryCode"]);

    if(!exam){
      // 404 - Action canceled! Exam not found
      const { code, message } = e.throwException(2, apiExceptions);
      return res.status(code).json({ message });
    }

    req.exam = exam;

    return next();
  },
  async store(req, res, next) {
    let invalidExamsIndex  = [];

    if(Array.isArray(req.body)){
      invalidExamsIndex  = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidNewExamObj);


      const existentExamsIndex = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExam);
      if(existentExamsIndex.length){
        // 405 - Action canceled! Input already existent at positions:
        const { code, message} = e.throwException(11, apiExceptions);
        return res.status(code).json({ message, positions : existentExamsIndex });
      }

      const existentExamTypesIndex  = await examTypeFnc.getInvalidExamTypeObjIndexInObjExamArray(req.body);
      if(existentExamTypesIndex.length){
        // 404 - Action canceled! Exam type not found
        const { code, message} = e.throwException(8, apiExceptions);
        return res.status(code).json({ message, positions : existentExamTypesIndex });
      }

      const unknowntLabsIndex  = await labFnc.getExistentLaboratoryObjIndexInObjExamArray(req.body);
      if(unknowntLabsIndex.length){
        // 404 - Action canceled! Laboratory not found at positions:
        const { code, message} = e.throwException(4, apiExceptions);
        return res.status(code).json({ message, positions : unknowntLabsIndex });
      }

      const inactiveLabsIndex  = await labFnc.getInactiveLaboratoryObjIndexInObjExamArray(req.body);
      if(inactiveLabsIndex.length){
        // 405 - Action canceled! Inactive laboratory at positions:
        const { code, message} = e.throwException(10, apiExceptions);
        return res.status(code).json({ message, positions : inactiveLabsIndex });
      }

      if(valFnc.isEmptyArray(invalidExamsIndex)){
        return next();
      }
    }
    // 405 - Action canceled! Invalid input at positions:
    const { code, message} = e.throwException(5, apiExceptions);

    return res.status(code).json({ message, positions: invalidExamsIndex });
  },
  async update(req, res, next) {
    let invalidExamsIndex = [];
    let existentExamsIndex;

    if(Array.isArray(req.body)){
      invalidExamsIndex = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidExamObj);

      if(valFnc.isEmptyArray(invalidExamsIndex)){
        existentExamsIndex       = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExamById);
        const positionsInRequest = valFnc.getAllPositionsInArray(req.body);

        const invalidPositions    = valFnc.getDifferentItemsInArrays(existentExamsIndex, positionsInRequest);
        if(invalidPositions.length){
          // 404 - Action canceled! Exam not found at positions:
          const { code, message} = e.throwException(6, apiExceptions);
          return res.status(code).json({ message, positions : invalidPositions });
        }

        const existentExamTypesIndex  = await examTypeFnc.getInvalidExamTypeObjIndexInObjExamArray(req.body);
        if(existentExamTypesIndex.length){
            // 404 - Action canceled! Exam type not found
            const { code, message} = e.throwException(8, apiExceptions);
            return res.status(code).json({ message, positions : existentExamTypesIndex });
        }

        const unknowntLabsIndex  = await labFnc.getExistentLaboratoryObjIndexInObjExamArray(req.body);
        if(unknowntLabsIndex.length){
          // 404 - Action canceled! Laboratory not found at positions:
          const { code, message} = e.throwException(4, apiExceptions);
          return res.status(code).json({ message, positions : unknowntLabsIndex });
        }

        const inactiveLabsIndex  = await labFnc.getInactiveLaboratoryObjIndexInObjExamArray(req.body);
        if(inactiveLabsIndex.length){
          // 405 - Action canceled! Inactive laboratory at positions:
          const { code, message} = e.throwException(10, apiExceptions);
          return res.status(code).json({ message, positions : inactiveLabsIndex });
        }

        return next();
      }
    }
      // 405 - Action canceled! Invalid input at positions:
      const { code, message} = e.throwException(5, apiExceptions);
      return res.status(code).json({ message, positions : invalidExamsIndex });
  },
  async destroy(req, res, next) {
    const { examsIds }        = req.params;
    const requestDeletedExams = ctrlFnc.getIdsArrayByStream(examsIds, "|");
    const deletedExamsIds     = valFnc.convertStringToIdObj(requestDeletedExams);
    const positionsInRequest  = valFnc.getAllPositionsInArray(deletedExamsIds);
    const existentExamsIndex  = await valFnc.getValidObjIndexInArray(deletedExamsIds, examFnc.isExistentExamById);
    const invalidPositions     = valFnc.getDifferentItemsInArrays(existentExamsIndex, positionsInRequest);

    if(invalidPositions.length){
      // 404 - Action canceled! Exam not found at positions:
      const { code, message} = e.throwException(6, apiExceptions);
      return res.status(code).json({ message, positions : invalidPositions });
    }else{
      req.deletedExams = requestDeletedExams;
      return next();
    }
  },
  async linkAndUnlinkLab(req, res, next) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);

    if(!exam){
      // 404 - Action canceled! Exam not found
      const { code, message } = e.throwException(2, apiExceptions);
      return res.status(code).json({ message });
    }

    if(!exam.status){
      // 405 - Action canceled! Exam is inactive
      const { code, message } = e.throwException(9, apiExceptions);
      return res.status(code).json({ message });
    }

    const objIdArray         = valFnc.convertStringToIdObj(req.body);
    const existentLabsIndex  = await valFnc.getValidObjIndexInArray(objIdArray, labFnc.isExistentLaboratoryById);
    const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
    const invalidPositions    = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

    if(invalidPositions.length){
      // 404 - Action canceled! Laboratory not found at positions:
      const { code, message} = e.throwException(7, apiExceptions);
      return res.status(code).json({ message, positions : invalidPositions });
    }

    const inactiveLabsIndex  = await labFnc.getInactiveLaboratoryInArray(existentLabsIndex,objIdArray);
    if(inactiveLabsIndex.length){
      // 405 - Action canceled! Inactive laboratory at positions:
      const { code, message} = e.throwException(10, apiExceptions);
      return res.status(code).json({ message, positions : inactiveLabsIndex });
    }

    req.exam = exam;
    return next();
  },
  async getLabsByExamName(req, res, next) {
    const { examName: name } = req.params;

    const exam = await Exam.findOne({ name }).populate(["laboratoryCode"]);

    if(!exam){
      // 404 - Action canceled! Exam name not found
      const { code, message } = e.throwException(3, apiExceptions);
      return res.status(code).json({ message });
    }

    req.exam = exam;
    return next();
  }
};
