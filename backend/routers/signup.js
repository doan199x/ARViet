const express = require("express");
const router = express.Router();
const signupModel = require('../model/signup.js');
router.post("/", async (req, res) => {
    try {
       const isExisted = await signupModel.checkEmail(req.body.email);
        if (isExisted[0].count != 0) {
         {
            res.sendStatus(403);
         }
        } else {
            const result = await signupModel.signup(req.fullname, req.isPaused,req.bodyemail, req.body.password);
            res.send(result);
        }
    } catch (error) {
      res.sendStatus(error);
    }
  });

module.exports = router;