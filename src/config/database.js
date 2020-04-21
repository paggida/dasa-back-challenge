const user             = "";
const psw              = "";
const host             = "db-mongo-dasa";
const port             = "27017";
const db               = "DasaDB";
const examTypeFnc      = require("../app/functions/examTypeFunctions");

module.exports = {
  uri(){
    const login = (user && psw)?`${user}:${psw}@`:"";
    return `mongodb://${login}${host}:${port}/${db}`
  },
  async initializeDatabases(){
    await examTypeFnc.initializeDatabase();
  }
}
