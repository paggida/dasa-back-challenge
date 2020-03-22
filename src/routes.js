const express = require("express");
const routes = express.Router();
const ctrlExam = require("./app/controllers/examController");
const ctrlLaboratory = require("./app/controllers/laboratoryController");
const mdlLab = require("./app/middlewares/laboratoryMiddleware");
const mdlExam = require("./app/middlewares/examMiddleware");

routes.get("/laboratory/index/:status", mdlLab.index, ctrlLaboratory.index);
routes.get("/laboratory/show/:labId", mdlLab.show, ctrlLaboratory.show);
routes.post("/laboratory/store", mdlLab.store, ctrlLaboratory.store);
routes.put("/laboratory/update", mdlLab.update, ctrlLaboratory.update);
routes.delete("/laboratory/destroy/:labsIds", mdlLab.destroy, ctrlLaboratory.destroy);

routes.get("/exam/:examName/laboratories", mdlLab.getByExamName, ctrlLaboratory.getByExamName);

routes.get("/exam/index/:status", mdlExam.index, ctrlExam.index);
routes.get("/exam/show/:examId", mdlExam.show, ctrlExam.show);
routes.post("/exam/store", mdlExam.store, ctrlExam.store);
routes.put("/exam/update", mdlExam.update, ctrlExam.update);
routes.delete("/exam/destroy/:examsIds", mdlExam.destroy, ctrlExam.destroy);

routes.post("/exam/:examId/linkLaboratory", mdlExam.linkLaboratory, ctrlExam.linkLaboratory);
routes.delete("/exam/:examId/unlinkLaboratory", mdlExam.unlinkLaboratory, ctrlExam.unlinkLaboratory);

module.exports = routes;
