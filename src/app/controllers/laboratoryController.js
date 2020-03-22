module.exports = {
  index(req, res) {
    const { status } = req.params;
    return res.json({ status, message: "Not implemented" });
  },
  show(req, res) {
    const { labId } = req.params;
    return res.json({ labId, message: "Not implemented" });
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
    const { labsIds } = req.params;
    return res.json({ labsIds, message: "Not implemented" });
  },
  getByExamName(req, res) {
    const { examName } = req.params;
    return res.json({ examName, message: "Not implemented" });
  }
};
