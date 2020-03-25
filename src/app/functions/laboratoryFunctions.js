const Laboratory = require("../models/Laboratory")

module.exports = {
  isValidNewLaboratoryObj(obj){
    return (obj.name && obj.address)? true : false;
  },
  isValidLaboratoryObj(obj){
    return ((obj.name || obj.Laboratory || obj.status) && obj.id )? true : false;
  },
  async isExistentLaboratory({name, address}){
    const response = await Laboratory.findOne({ name, address });
    return response? true : false;
  },
  async isExistentLaboratoryById({ id }){
    const response = await Laboratory.findById(id);
    return response? true : false;
  }
};

