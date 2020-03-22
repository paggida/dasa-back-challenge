const e = require("./exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");

module.exports = {
  getValidatedResponse(obj,emptyErrorCode){
    if(!_isEmpty(obj)){
      return {code: 200, message: obj}
    }else{
      return e.throwException(emptyErrorCode, apiExceptions);
    }
  }
};

_isEmpty=(obj)=>{
 return (!obj || Object.keys(obj).length === 0)
}
