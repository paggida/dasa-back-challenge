const apiExceptions = require("../Exceptions/apiExceptions");
const e             = require("../functions/exceptionFunctions");
const valFnc        = require("../functions/validationFunctions");

module.exports = {
  index(req, res, next) {
    const { status } = req.params;

    if(valFnc.isValidStatus(status)){
      return next();
    }
    else{
      // 400 - Action canceled! Invalid status
      const { code, message} = e.throwException(1, apiExceptions);
      return res.status(code).json({ message });
    }
  }
};
