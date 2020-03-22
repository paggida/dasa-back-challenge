module.exports = {
  index(req, res) {
    const { status } = req.params;
    return res.json({ status, message: "Not implemented" });
  },
  show(req, res) {
    const { examId } = req.params;
    return res.json({ examId, message: "Not implemented" });
  },
  store(req, res) {
    const body = req.body;
    return res.json({
      body: { ...body, status: true },
      message: "Not implemented"
    });
  },
  update(req, res) {
    const body = req.body;
    return res.json({ body, message: "Not implemented" });
  },
  destroy(req, res) {
    const { examsIds } = req.params;
    return res.json({ examsIds, message: "Not implemented" });
  },
  linkLaboratory(req, res) {
    const { examId } = req.params;
    const body = req.body;
    return res.json({ examId, body, message: "Not implemented" });
  },
  unlinkLaboratory(req, res) {
    const { examId } = req.params;
    const body = req.body;
    return res.json({ examId, body, message: "Not implemented" });
  }
};
