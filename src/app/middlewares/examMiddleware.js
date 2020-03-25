const Exam          = require("../models/Exam");
const apiExceptions = require("../Exceptions/apiExceptions");
const e             = require("../functions/exceptionFunctions");
const examFnc       = require("../functions/examFunctions");
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
    let existentExamsIndex = [];

    if(Array.isArray(req.body)){
      invalidExamsIndex  = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidNewExamObj);
      existentExamsIndex = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExam);

      if(valFnc.isEmptyArray(invalidExamsIndex) && valFnc.isEmptyArray(existentExamsIndex)){
        return next();
      }
    }

    const position = valFnc.mergeArrayWithoutRepeatItem(invalidExamsIndex, existentExamsIndex);
    // 405 - Action canceled! Invalid input at positions:
    const { code, message} = e.throwException(5, apiExceptions);

    return res.status(code).json({ message, position });
  },
  async update(req, res, next) {
    let invalidExamsIndex = [];
    let existentExamsIndex;

    if(Array.isArray(req.body)){
      invalidExamsIndex = await valFnc.getInvalidObjIndexInArray(req.body, examFnc.isValidExamObj);

      if(valFnc.isEmptyArray(invalidExamsIndex)){
        existentExamsIndex       = await valFnc.getValidObjIndexInArray(req.body, examFnc.isExistentExamById);
        const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
        const invalidPosition    = valFnc.getDifferentItemsInArrays(existentExamsIndex, positionsInRequest);

        if(invalidPosition.length){
          // 404 - Action canceled! Exam not found at positions:
          const { code, message} = e.throwException(6, apiExceptions);
          return res.status(code).json({ message, position : invalidPosition });
        }else{
          return next();
        }
      }
    }
      // 405 - Action canceled! Invalid input at positions:
      const { code, message} = e.throwException(5, apiExceptions);
      return res.status(code).json({ message, position : invalidExamsIndex });
  },
  async destroy(req, res, next) {
    const { examsIds }        = req.params;
    const requestDeletedExams = ctrlFnc.getIdsArrayByStream(examsIds, "|");
    const deletedExamsIds     = valFnc.convertStringToIdObj(requestDeletedExams);
    const positionsInRequest  = valFnc.getAllPositionsInArray(deletedExamsIds);
    const existentExamsIndex  = await valFnc.getValidObjIndexInArray(deletedExamsIds, examFnc.isExistentExamById);
    const invalidPosition     = valFnc.getDifferentItemsInArrays(existentExamsIndex, positionsInRequest);

    if(invalidPosition.length){
      // 404 - Action canceled! Exam not found at positions:
      const { code, message} = e.throwException(6, apiExceptions);
      return res.status(code).json({ message, position : invalidPosition });
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

    const objIdArray         = valFnc.convertStringToIdObj(req.body);
    const existentLabsIndex  = await valFnc.getValidObjIndexInArray(objIdArray, labFnc.isExistentLaboratoryById);
    const positionsInRequest = valFnc.getAllPositionsInArray(req.body);
    const invalidPosition    = valFnc.getDifferentItemsInArrays(existentLabsIndex, positionsInRequest);

    if(invalidPosition.length){
      // 404 - Action canceled! Laboratory not found at positions:
      const { code, message} = e.throwException(7, apiExceptions);
      return res.status(code).json({ message, position : invalidPosition });
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
