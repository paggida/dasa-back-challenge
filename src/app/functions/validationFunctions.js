const e = require("./exceptionFunctions");
const statusEnum = require("../enum/statusEnum")
const apiExceptions = require("../Exceptions/apiExceptions");

module.exports = {
  getValidatedResponse(obj,emptyErrorCode){
    if(!isEmptyObj(obj)){
      return {code: 200, message: obj}
    }else{
      return e.throwException(emptyErrorCode, apiExceptions);
    }
  },
  isEmptyObj(obj){
    return (!obj || Object.keys(obj).length === 0)
  },
  isEmptyArray(array){
    return (array.length === 0)
  },
  isValidStatus(status){
    return !!statusEnum[status.toLowerCase()];
  },
  async getInvalidObjIndexInArray(array, objValidationFnc){
    let invalidExamsId = [];
    for (index in array) {
      if(await !objValidationFnc(array[index])) invalidExamsId.push(index);
    }
    return invalidExamsId;
  },
  async getValidObjIndexInArray(array, objValidationFnc){
    let invalidExamsId = [];
    for (index in array) {
      if(await objValidationFnc(array[index])) invalidExamsId.push(index);
    }
    return invalidExamsId;
  },
  mergeArrays(arrayA, ArrayB){
    const mergeArray = [...arrayA, ...ArrayB]

    var unifiedArray= mergeArray.filter((item, i) => mergeArray.indexOf(item) === i);
    return unifiedArray;
  }
};
