const Exam = require("../models/Exam")
const ExamToLab = require("../models/RelExamToLab")
const ctrlFnc = require("../functions/controllersFunctions")
const valFnc = require("../functions/validationFunctions")

module.exports = {
  async index(req, res) {
    const { status } = req.params;
    const filter     = ctrlFnc.getIndexFilterByStatus(status)

    const exams = await Exam.find(filter);

    return res.json(exams);
  },
  async show(req, res) {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    const { code, message } =  valFnc.getValidatedResponse(exam, 2);

    return res.status(code).json({ message });
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
    const { examId: examCode } = req.params;

    for (let laboratoryCode of req.body) {
      await ExamToLab.create({ examCode, laboratoryCode});
    }

    return res.status(200).send();
  },
  async unlinkLaboratory(req, res) {
    const { examId: examCode } = req.params;

    for (let laboratoryCode of req.body) {
      await ExamToLab.findOneAndDelete({ examCode, laboratoryCode});
    }

    return res.status(200).send();
  }
};
