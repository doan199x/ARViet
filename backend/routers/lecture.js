const express = require("express");
const router = express.Router();
const lectureModel = require("../model/lecture.js");
const markerModel = require("../model/marker");
const actionModel = require("../model/action");
const config = require("../utils/config")

router.post("/", async (req, res) => {
  try {
    const lecture = await lectureModel.findLecture(req.body.userid);
    for (let i =0;i<lecture.length;i++){
      let markers = await markerModel.getByLessonID(lecture[i].lessonID);
      lecture[i].markerDefault = markers[0];
    }
    res.send(lecture);
  }
  catch (error) {
    res.send(error);
  }
});

router.post("/new", async (req, res) => {
  try {
    const result = await lectureModel.new(req.body.userid, req.body.lecname, req.body.description);
    let noImageURL = config.baseURL + "/upload/marker/no-image.png"
    const newMarker = await markerModel.addMarker(result.insertId, noImageURL);
    const newInitAction = await actionModel.add(newMarker.insertId, "Khởi tạo");
    const returnValue = await lectureModel.getByID(result.insertId);
    res.send(returnValue);
  }
  catch (error) {
    res.send(error);
  }
});
router.post("/marker", async (req, res) => {
  try {
    const marker = await lectureModel.getAllMarker(req.body.lecid);
    res.send(marker);
  }
  catch (error) {
    res.send(error);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const result = await lectureModel.deleteLecture(req.body.lecid);
    res.send(result);
  }
  catch (error) {
    res.send(error);
  }
});
router.post("/name", async (req, res) => {
  try {
    const result = await lectureModel.getByID(req.body.lessonID);
    res.send(result);
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = router;