const express        = require("express");
const routes         = express.Router();
const mdlLab         = require("./app/middlewares/laboratoryMiddleware");
const mdlExam        = require("./app/middlewares/examMiddleware");
const mdlApi         = require("./app/middlewares/apiMiddleware");
const ctrlExam       = require("./app/controllers/examController");
const ctrlExamType   = require("./app/controllers/examTypeController");
const ctrlLaboratory = require("./app/controllers/laboratoryController");

routes.get("/laboratory/index/:status", mdlApi.index, ctrlLaboratory.index);
routes.get("/laboratory/show/:labId", mdlLab.show, ctrlLaboratory.show);
routes.post("/laboratory/store", mdlLab.store, ctrlLaboratory.store);
routes.put("/laboratory/update", mdlLab.update, ctrlLaboratory.update);
routes.delete("/laboratory/destroy/:labsIds", mdlLab.destroy, ctrlLaboratory.destroy);

routes.get("/exam/index/:status", mdlApi.index, ctrlExam.index);
routes.get("/exam/show/:examId", mdlExam.show, ctrlExam.show);
routes.post("/exam/store", mdlExam.store, ctrlExam.store);
routes.put("/exam/update", mdlExam.update, ctrlExam.update);
routes.delete("/exam/destroy/:examsIds", mdlExam.destroy, ctrlExam.destroy);

routes.post("/exam/:examId/linkLaboratory", mdlExam.linkAndUnlinkLab, ctrlExam.linkLaboratory);
routes.delete("/exam/:examId/unlinkLaboratory", mdlExam.linkAndUnlinkLab, ctrlExam.unlinkLaboratory);
routes.get("/exam/:examName/laboratories", mdlExam.getLabsByExamName, ctrlExam.getLabsByExamName);

routes.get("/exam/type/index", ctrlExamType.index);
routes.get("/exam/type/show/:examTypeId", ctrlExamType.show);

module.exports = routes;
