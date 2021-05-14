const express = require("express");
const router = express.Router();
const lectureModel = require("../model/lecture.js");

router.post("/", async (req, res) => {
    try {
      const lecture= await lectureModel.findLecture(req.body.userid);
        res.send(lecture);
      }
       catch (error) {
      res.send(error);
    }
  });

  module.exports = router;