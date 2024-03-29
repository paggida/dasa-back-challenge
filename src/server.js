const cors            = require("cors");
const youch           = require("youch");
const express         = require("express");
const mongoose        = require('mongoose');
const dbConfig        = require('./config/database');
const appConfig       = require("./config/app");
const swaggerUi       = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const routesFile      = require("./routes");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.security();
    this.routes();
    this.exception();
  }
  database () {
    mongoose.connect(dbConfig.uri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }
  security() {
    this.express.disable("x-powered-by");
    this.express.disable("etag");
  }
  routes() {
    this.express.use(routesFile);
    this.express.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  exception() {
    /* In production returns standard error, in other environments
       returns errors treated in JSON format.*/
    this.express.use(async (err, req, res, next) => {
      if (appConfig.Environment !== "production") {
        const errYouch = new youch(err, req);
        return res.json(await errYouch.toJSON());
      }
      return res.status(err.status || 500).json({
        message: "Internal server error, please try again later"
      });
    });
  }
}

module.exports = new App().express;
