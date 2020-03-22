const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const valfnc = require("../functions/validationFunctions");

module.exports = {
  index(req, res, next) {
    const { status } = req.params;
    if(valfnc.isValidStatus(status)){
      return next();
    }
    else{
      const { code, message} = e.throwException(1, apiExceptions);
      return res.status(code).json({ message });
    }
  }
};
