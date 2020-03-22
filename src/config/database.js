const user = "";
const psw  = "";
const host = "localhost";
const port = "27017";
const db   = "DasaDB";

module.exports = {
  uri(){
    const login = (user && psw)?`${user}:${psw}@`:"";
    return `mongodb://${login}${host}:${port}/${db}`
  }
}
