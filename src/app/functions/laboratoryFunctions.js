const Laboratory = require("../models/Laboratory")

module.exports = {
  isValidNewLaboratoryObj(obj){
    return (obj.name && obj.address)? true : false;
  },
  isValidLaboratoryObj(obj){
    return ((obj.name || obj.address || obj.status || !obj.status) && obj.id )? true : false;
  },
  async isExistentLaboratory({name, address}){
    const response = await Laboratory.findOne({ name, address });
    return response? true : false;
  },
  async isExistentLaboratoryById({ id }){
    const response = await Laboratory.findById(id);
    return response? true : false;
  },
  async isActiveLaboratoryById({ id }){
    const response = await Laboratory.findById(id);
    return response.status;
  },
  async getInactiveLaboratoryInArray(indexsExistentLabsArray, labsArray){
    let inactiveLabs = [];

    for (let index of indexsExistentLabsArray) {
      if(!await this.isActiveLaboratoryById(labsArray[index])){
        inactiveLabs.push(index);
      };
    };

    return inactiveLabs;
  },
  isValidLablaboratoryCode(labolaboratoryCode){
    if(labolaboratoryCode){
      return (labolaboratoryCode.length)? true : false;
    }
  },
  setIndexArrayAttributeInArrayByItem(item, indexArray){
    return {...item, indexArray };
  },
  async isAllActiveLaboratoryCode(laboratoryCodeArray, inactiveLabsCodeArray){
    let inactiveLaboratoryCode= [];

    for (let id of laboratoryCodeArray) {
      if(inactiveLabsCodeArray.indexOf(id) < 0){
        if(!await this.isActiveLaboratoryById({ id })){
          inactiveLabsCodeArray.push(id);
          inactiveLaboratoryCode.push(id);
        }
      }else{
        inactiveLaboratoryCode.push(id);
      };
    };

    return !inactiveLaboratoryCode.length;
  },
  async getInactiveLaboratoryObjIndexInObjExamArray(examsArray){
    let inactiveLabCodes = [];
    let invalidIndex = [];

    const validatedExamsArray = examsArray
      .map((item, index)=> this.setIndexArrayAttributeInArrayByItem(item, index))
      .filter(({ laboratoryCode })=> this.isValidLablaboratoryCode(laboratoryCode));

    for (let { indexArray, laboratoryCode } of validatedExamsArray) {
      if(!await this.isAllActiveLaboratoryCode(laboratoryCode, inactiveLabCodes)){
        invalidIndex.push(indexArray);
      }else{
      };
    };

    return invalidIndex;
  }
};

