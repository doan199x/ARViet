const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const markerModel = require('../model/marker');
const actionModel = require('../model/action');
const config = require('../utils/config');

//multer marker
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, 'public/upload/marker')
  },
  filename: function (req, file, next) {
    if (file.mimetype == 'image/png') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.png')
    } else if (file.mimetype == 'image/jpeg') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.jpg')
    }
  }
})

var upload = multer({
  storage: storage,
})
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    // update lai marker
    // Luu marker vao danh sach
    markerID = req.body.markerID;
    let file = req.file;
    let URL = config.baseURL + '/upload/marker/' + file.filename;
    const updateMarker = await markerModel.updateURL(markerID, URL);
    const getAll = await markerModel.getByLessonID(req.body.lessonID);
    res.json(getAll);
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const markerID = req.query.markerID;
    const getMarker = await markerModel.getByID(markerID);
    res.json(getMarker);
  } catch (err) {
    next(err);
  }
})

router.post("/add", async (req, res) => {
  try {
    let URL = config.baseURL + '/upload/marker/no-image.png';
    const marker = await markerModel.addMarker(req.body.lecid, URL);
    // add new action
    const newAction = await actionModel.add(marker.insertId, 'Khởi tạo');

    //get all
    let allMarker = await markerModel.getByLessonID(req.body.lecid);
    res.send(allMarker);
  }
  catch (error) {
    res.send(error);
  }
});

router.get("/getall", async (req, res) => {
  try {
    let allMarker = await markerModel.getByLessonID(req.query.lecid);
    res.send(allMarker);
  }
  catch (error) {
    res.send(error);
  }
})

router.post("/scale", async (req, res) => {
  try {
    markerScale = req.body.markerScale;
    markerID = req.body.markerID;
    console.log(markerID);
    console.log(markerScale);
    let setMarkerScale = await markerModel.setMarkerScale(markerScale, markerID);
    res.json([]);
  }
  catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    // check xem lieu co con 1 diem hay ko
    let getMarkers = await markerModel.getByLessonID(req.query.lessonID);
    if (getMarkers.length == 1) {
      res.json([])
    } else {
      let result = await markerModel.deleteMarker(req.query.markerID);
      let getAll = await markerModel.getByLessonID(req.query.lessonID)
      res.json(getAll);
    }
  } catch (err) {
    next(err);
  }
})

module.exports = router;