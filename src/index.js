const server    = require("./server");
const appConfig = require("./config/app");

server.listen(appConfig.AppPort || 3000);
console.log(`API documentation: http://localhost:${appConfig.AppPort || 3000}/doc`);
