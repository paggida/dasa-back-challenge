const fnc = require("../functions/validationFunctions");

module.exports = {
  index(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
  show(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  },
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
  getByExamName(req, res, next) {
    return next();
    //return res.status(Code).json({ error: "Token inválido" });
  }
};
