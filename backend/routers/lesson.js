const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const studentModel = require('../model/student');
const lessonModel = require('../model/lesson');
const markerModel = require('../model/marker');
const ARContentModel = require('../model/arcontent');

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
        markerList: []
      })
    } else {
      let markerList = [];
      for (let i = 0; i < getMarkerList.length; i++) {
        getMarkerList[i].isEmpty = true;
        let getActionList = await lessonModel.getByMarkerID(getMarkerList[i].markerID);
        for (let j = 0; j < getActionList.length; j++) {
          let getARContent = await ARContentModel.getByActionID(getActionList[j].actionID);
          for (let k = 0; k < getARContent.length; k++) {
            getMarkerList[i].isEmpty = false;
            let getTextARContent = await ARContentModel.getTextARContent(getARContent[k].contentID);
            if (getTextARContent[0] === undefined) {
              let textARContentObject = {
                contentID: null,
                text: null,
                font: null,
                size: null,
                color: null,
                backgroundColor: null,
                isTransparent: null
              }
              getARContent[k].textARContent = textARContentObject;
            } else {
              getARContent[k].textARContent = getTextARContent[0];
            }
            if (getARContent[k].fatherID == null){
              getARContent[k].fatherARContent = null;
            }else{
              let getFatherARContent = await ARContentModel.getARContentByID(getARContent[k].fatherID);
              getFatherARContent[0].isChildHidden = false;
              getARContent[k].fatherARContent= getFatherARContent[0];
            }
          }
          getActionList[j].arContentList = getARContent;
        }
        getMarkerList[i].actionList = getActionList;
        markerList.push(getMarkerList[i]);
      }
      res.json({
        status: "success",
        markerList: markerList
      })
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;