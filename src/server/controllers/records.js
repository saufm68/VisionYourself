module.exports = db => {
  const getRecord = (req, res) => {
    db.records.getRecord(req.cookies["doctorId"], (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: error.message });
      } else {
        res.send(result);
      }
    });
  };

  const addRecord = (req, res) => {
    const records = {
      name: req.body.name,
      email: req.body.email,
      doctor: req.body.doctor,
      addon: JSON.stringify({
        healthCondition: req.body.healthCondition,
        medication: req.body.medication,
        surgery: req.body.surgery,
        checkup: req.body.checkup
      }),
      question: req.body.questions,
      answers: req.body.answers
    };

    db.records.addRecord(records, error => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: error.message });
      } else {
        res.redirect("/test");
      }
    });
  };

  return {
    getRecord,
    addRecord
  };
};
