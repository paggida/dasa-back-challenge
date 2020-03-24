const Exam = require("../models/Exam");
const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const ctrlFnc = require("../functions/controllersFunctions");
const valFnc = require("../functions/validationFunctions");

module.exports = {
  async index(req, res) {
    const { status } = req.params;
    const filter     = ctrlFnc.getIndexFilterByStatus(status);

    const exams = await Exam.find(filter).populate(["examTypeCode","laboratoryCode"]);

    return res.json(exams);
  },
  async show(req, res) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate(["examTypeCode","laboratoryCode"]);

    if(!exam){
      const { code, message } = e.throwException(2, apiExceptions);
      return res.status(code).json({ message });
    }
    return res.status(200).json(exam);
  },
  async store(req, res) {
    const createdExams = [];

    for (let exam of req.body) {
      createdExams.push(await Exam.create({ ...exam, status: true}));
    }

    return res.json(createdExams);
  },
  async update(req, res) {
    const updatedExams = [];

    for (let {id, ...exam} of req.body) {
      updatedExams.push(await Exam.findByIdAndUpdate(id, exam, {
        new: true
      }))
    }

    return res.json(updatedExams);
  },
  async destroy(req, res) {
    const { examsIds } = req.params;
    const deletedExams = ctrlFnc.getIdsArrayByStream(examsIds, "|");

    for (let id of deletedExams) await Exam.findByIdAndDelete(id);

    return res.status(200).send();
  },
  async linkLaboratory(req, res) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);

    const newLaboratoryCode = valFnc.mergeArrayWithoutRepeatItem(exam.laboratoryCode, req.body);
    await Exam.findByIdAndUpdate( examId, { laboratoryCode : newLaboratoryCode})

    return res.status(200).send();
  },
  async unlinkLaboratory(req, res) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);

    const { code, message } =  valFnc.getValidatedResponse(exam, 2);

    if(code = 200)

    req.body.map((item)=> exam.laboratoryCode.remove(item) );

    exam.save();

    return res.status(200).send();
  },
  async getLabsByExamName(req, res) {
    const { examName: name } = req.params;

    const exams = await Exam.findOne({ name }).populate(["laboratoryCode"]);

    return res.json(exams.laboratoryCode);
  }
};
