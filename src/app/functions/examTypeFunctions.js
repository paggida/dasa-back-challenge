const ExamType        = require("../models/ExamType");

module.exports = {
  async isExistentExamTypeById({ id }){
    const response = await ExamType.findById(id);
    return response? true : false;
  }
}
