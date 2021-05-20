const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const studentModel = require('../model/student');
const lessonModel = require('../model/lesson');
const markerModel = require('../model/marker');

router.get("/", token.verify, async (req, res, next) => {
  try {
    const lesson = await lessonModel.getLessonList(req.authData.student.username);
    console.log(lesson);
    res.json(lesson);
  } catch (error) {
    next(err);
  }
});

router.post("/", token.verify, async (req, res, next) => {
  try {
    let lessonID = req.body.lessonID;
    // Bai giang khong ton tai
    const isExiststed = await lessonModel.checkLesson(lessonID);
    if (isExiststed.length == 0) {
      res.json({
        status: 'lessonID is incorrect',
        lesson: {
          lessonID: 1,
          name: "",
          description: "",
          teacherName: ""
        }
      })
    } else {
      // Bai giang da co trong danh sach hien tai
      let username = req.authData.student.username;
      let checkLessonList = await lessonModel.checkExistsed(username, lessonID);
      if (checkLessonList.length != 0) {
        res.json({
          status: 'lessonID is existed',
          lesson: {
            lessonID: 1,
            name: "",
            description: "",
            teacherName: ""
          }
        })
      } else {
        // Them vao danh sach hoc sinh bai giang
        let getStudentByUsername = await studentModel.getByUsername(req.authData.student.username);
        let studentID = getStudentByUsername[0].studentID;
        let addStudentLesson = await lessonModel.addStudentLesson(studentID, lessonID);
        let lesson = await lessonModel.getLessonByID(lessonID);
        if (addStudentLesson.affectedRows == 1) {
          res.json({
            status: 'add successfully',
            lesson: {
              lessonID: lessonID,
              name: lesson[0].name,
              description: lesson[0].description,
              teacherName: lesson[0].teacherName
            }
          })
        }
      }
    }
  } catch (err) {
    next(err);
  }
})

router.get("/marker", async (req, res, next) => {
  try {
    let lessonID = req.query.lessonID;
    let getMarkerList = await markerModel.getByLessonID(lessonID);
    if (getMarkerList.length == 0) {
      res.json({
        status: "lesson is empty",
        markerList: [{
          markerID: 0,
          URL: "",
          scale: 1,
          lessonID: 0,
          filename: ""
        }]
      })
    } else {
      console.log(getMarkerList);
      res.json({
        status: "success",
        markerList: getMarkerList
      })
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;