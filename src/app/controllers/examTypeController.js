const ExamType        = require("../models/ExamType");
const dbConfig        = require('../../config/database');
const valFnc          = require("../functions/validationFunctions");
const defaultExamType = dbConfig.getDefaultExamTypes();

module.exports = {
  async index(req, res) {
    const examTypes = await ExamType.find();

    return res.json(examTypes);
  },
  async show(req, res) {
    const { examTypeId }    = req.params;
    const examType          = await ExamType.findById(examTypeId);
    const { code, message } =  valFnc.getValidatedResponse(examType, 8);

    return res.status(code).json({ message });
  },
  async store(req, res) {
    for (let description of defaultExamType) await ExamType.create({ description });

    return res.status(200).send();
  },
  async destroy(req, res) {
    for (let description of defaultExamType) await ExamType.findOneAndDelete({ description });

    return res.status(200).send();
  },
};
