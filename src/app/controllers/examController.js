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
    const { exam } = req;

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
    const { deletedExams } = req;

    for (let id of deletedExams) await Exam.findByIdAndDelete(id);

    return res.status(200).send();
  },
  async linkLaboratory(req, res) {
    const { exam } = req;

    const newLaboratoryCode = valFnc.mergeArrayWithoutRepeatItem(exam.laboratoryCode, req.body);
    await Exam.findByIdAndUpdate( exam.id, { laboratoryCode : newLaboratoryCode})

    return res.status(200).send();
  },
  async unlinkLaboratory(req, res) {
    const { exam } = req;

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
