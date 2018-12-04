module.exports = (app, db) => {
  const users = require("./controllers/users")(db);
  const records = require("./controllers/records")(db);

  app.post("/register", users.register);
  app.post("/login", users.login);
  app.post("/logout", users.logout);
  app.get("/api/profile", users.profile);
  app.post("/api/deleteProfile", users.deleteProfile);

  app.get("/api/getRecord", records.getRecord);
  app.post("/api/addRecord", records.addRecord);
};
