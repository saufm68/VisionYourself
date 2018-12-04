module.exports = db => {
  const register = (req, res) => {
    db.users.register(req.body, (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: result });
      } else {
        console.log(result);
        res.cookie("doctorId", result.id);
        res.cookie("doctor", result.name);
        res.redirect("/");
      }
    });
  };

  const login = (req, res) => {
    db.users.login(req.body, (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: result });
      } else {
        if (!result.invalid) {
          res.cookie("doctorId", result.id);
          res.cookie("doctor", result.name);
        }
        res.send(result);
      }
    });
  };

  const logout = (req, res) => {
    res.clearCookie("doctor");
    res.clearCookie("doctorId");
    res.redirect("/");
  };

  const profile = (req, res) => {
    db.users.profile(req.cookies["doctorId"], (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: result });
      } else {
        res.send(result);
      }
    });
  };

  const deleteProfile = (req, res) => {
    db.users.deleteProfile(req.cookies["doctorId"], error => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: error.message });
      } else {
        res.clearCookie("doctor");
        res.clearCookie("doctorId");
        res.redirect("/");
      }
    });
  };

  return {
    register,
    login,
    logout,
    profile,
    deleteProfile
  };
};
