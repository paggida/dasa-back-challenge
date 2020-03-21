const express = require("express");
const routes = express.Router();

routes.get("/teste", (req, res) => res.json({ message: "Mensagem inicial" }));

module.exports = routes;
