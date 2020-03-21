const express = require("express");
const routes = express.Router();
const ctrlExam = require("./app/controllers/examController");
const ctrlLaboratory = require("./app/controllers/laboratoryController");

routes.get("/exam/index", ctrlExam.index);
routes.get("/exam/show/:examId", ctrlExam.show);
routes.post("/exam/store", ctrlExam.store);
routes.put("/exam/update", ctrlExam.update);
routes.delete("/exam/destroy/:examsIds", ctrlExam.destroy);

routes.get("/laboratory/index", ctrlLaboratory.index);
routes.get("/laboratory/show/:labId", ctrlLaboratory.show);
routes.post("/laboratory/store", ctrlLaboratory.store);
routes.put("/laboratory/update", ctrlLaboratory.update);
routes.delete("/laboratory/destroy/:labsIds", ctrlLaboratory.destroy);

routes.get("/exam/:examName/laboratories", ctrlLaboratory.getByExamName);

routes.post("/exam/:examId/connectLaboratory", ctrlExam.connectLaboratory);
routes.delete(
  "/exam/:examId/disconnectLaboratory",
  ctrlExam.disconnectLaboratory
);
module.exports = routes;
