const e = require("./exceptionFunctions");
const statusEnum = require("../enum/statusEnum")
const apiExceptions = require("../Exceptions/apiExceptions");

module.exports = {
  getValidatedResponse(obj,emptyErrorCode){
    if(!isEmpty(obj)){
      return {code: 200, message: obj}
    }else{
      return e.throwException(emptyErrorCode, apiExceptions);
    }
  },
  isEmpty(obj){
    return (!obj || Object.keys(obj).length === 0)
   },
   isValidStatus(status){
    return !!statusEnum[status.toLowerCase()];
   }
};
