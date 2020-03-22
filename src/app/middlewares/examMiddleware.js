const e = require("../functions/exceptionFunctions");
const apiExceptions = require("../Exceptions/apiExceptions");
const valfnc = require("../functions/validationFunctions");

module.exports = {
  store(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  update(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  destroy(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  linkLaboratory(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  unlinkLaboratory(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  }
};
