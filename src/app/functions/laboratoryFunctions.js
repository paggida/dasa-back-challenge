const Laboratory = require("../models/Laboratory")

module.exports = {
  isValidLaboratoryObj(obj){
    return (obj.name && obj.address)? true : false;
  },
  async isExistentLaboratory({name, address}){
    const response = await Laboratory.findOne({ name, address })
    return response? true : false;
  }
};

