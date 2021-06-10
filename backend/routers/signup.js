const express = require("express");
const router = express.Router();
const signupModel = require("../model/signup.js");
const studentModel = require("../model/student");
const bcrypt = require("bcrypt");

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

router.post("/mobile", async (req, res) => {
  const student = req.body;
  const salt = bcrypt.genSaltSync(10);
  student.password = bcrypt.hashSync(student.password, salt);
  const isExisted = await studentModel.checkUsername(student.username);
  if (isExisted.length != 0) {
    res.json({
      status: 'username is exsited'
    })
  } else {
    const result = await studentModel.signup(student);
    let status = "failed";
    if (result.affectedRows == 1) {
      status = 'success'
    }
    res.json({
      status: status
    });
  }
})
module.exports = router;
