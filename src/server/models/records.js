module.exports = dbPool => {
  const addRecord = (input, callback) => {
    const text = `INSERT INTO records (name, email, doctor, addon, question, answers) values ($1, $2, $3, $4, $5, $6);`;
    const values = [
      input.name,
      input.email,
      input.doctor,
      input.addon,
      input.question,
      input.answers
    ];

    dbPool.query(text, values, (error, result) => {
      callback(error);
    });
  };

  const getRecord = (doctor, callback) => {
    const text = `SELECT * FROM records WHERE doctor='${doctor}' ORDER BY id DESC;`;

    dbPool.query(text, (error, result) => {
      callback(error, result.rows);
    });
  };
  return {
    addRecord,
    getRecord
  };
};
