const Laboratory = require("../models/Laboratory")
const ctrlFnc = require("../functions/controllersFunctions")

module.exports = {
  async index(req, res) {
    const { status }   = req.params;
    const filter       = ctrlFnc.getIndexFilterByStatus(status)

    const laboratories = await Laboratory.find(filter);

    return res.json(laboratories);
  },
  async show(req, res) {
    const { labId }  = req.params;

    const laboratory = await Laboratory.findById(labId);

    return res.json(laboratory);
  },
  async store(req, res) {
    const createdLabs = [];

    for (let lab of req.body) {
      createdLabs.push(await Laboratory.create({ ...lab, status: true}));
    }

    return res.json(createdLabs);
  },
  async update(req, res) {
    const updatedLabs = [];

    for (let {id, ...lab} of req.body) {
      updatedLabs.push(await Laboratory.findByIdAndUpdate(id, lab, {
        new: true
      }))
    }

    return res.json(updatedLabs);
  },
  async destroy(req, res) {
    const { labsIds } = req.params;
    const deletedLabs = ctrlFnc.getIdsArrayByStream(labsIds, "|");

    for (let id of deletedLabs) await Laboratory.findByIdAndDelete(id);

    return res.status(200).send();
  },
  async getByExamName(req, res) {
    const { examName } = req.params;
    return res.json({ examName, message: "Not implemented" });
  }
};
