const sha256 = require("js-sha256");
const SALT = "EyeCare, its important!";

module.exports = dbPool => {
  const register = (input, callback) => {
    const text = `INSERT INTO users (email, password, name, clinic, address, postalCode, contact) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name;`;
    const values = [
      input.email,
      sha256(SALT + input.password),
      input.displayName,
      input.clinicName,
      input.address,
      input.postalCode,
      input.contact
    ];

    dbPool.query(text, values, (error, result) => {
      callback(error, result.rows[0]);
    });
  };

  const login = (input, callback) => {
    const text = `SELECT * FROM users WHERE email='${
      input.email
    }' AND password='${sha256(SALT + input.password)}';`;

    dbPool.query(text, (error, result) => {
      if (!result.rows[0]) {
        const invalid = { invalid: true };
        callback(error, invalid);
      } else {
        callback(error, result.rows[0]);
      }
    });
  };

  const profile = (user, callback) => {
    const text = `SELECT * FROM users WHERE id='${user}';`;

    dbPool.query(text, (error, result) => {
      callback(error, result.rows[0]);
    });
  };

  const deleteProfile = (doctor, callback) => {
    const text = `DELETE FROM users WHERE id='${doctor}';`;

    dbPool.query(text, error => {
      callback(error);
    });
  };

  return {
    register,
    login,
    profile,
    deleteProfile
  };
};
