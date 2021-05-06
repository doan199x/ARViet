const express = require("express");
const router = express.Router();
const signupModel = require("../model/signup.js");
router.post("/", async (req, res) => {
  try {
    const isExisted = await signupModel.checkEmail(req.body.email);
    if (isExisted && isExisted[0].count != 0) {
      res.send("existed");
    } else {
      const result = await signupModel.signup(
        req.body.fullname,
        req.body.id,
        req.body.email,
        req.body.password
      );
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
