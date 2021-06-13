const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const markerModel = require('../model/marker');
const ARContentModel = require('../model/arcontent');
const actionModel = require('../model/action');
const config = require('../utils/config');

//ar content
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, 'public/upload/arcontent')
  },
  filename: function (req, file, next) {
    if (file.originalname[file.originalname.length - 1] == 'f') {
      next(null, file.originalname.substr(0, file.originalname.length - 5) + '-' + Date.now() + '.gltf')
    } else if (file.originalname[file.originalname.length - 1] == 'b') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.glb')
    } else if (file.mimetype == 'image/jpeg') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.jpg')
    } else if (file.mimetype == 'image/png') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.png')
    } else if (file.mimetype == 'video/mp4') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.mp4')
    } else if (file.originalname[file.originalname.length - 1] == '3') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.mp3')
    }
  }
})

var upload = multer({
  storage: storage,
})
router.post("/temp", upload.single("file"), async (req, res, next) => {
  try {
    console.log(req.file);
    const ARContent = {
      actionID: req.body.actionID,
      xPosition: 0,
      yPosition: 0,
      zPosition: 0,
      xScale: 1,
      yScale: 1,
      zScale: 1,
      URL: config.baseURL + '/upload/arcontent/' + req.file.filename,
      filename: req.file.filename,
      xRotation: 0,
      yRotation: 0,
      zRotation: 0,
      isFile: true,
      isTemp: true
    };
    let addTempARContent = await ARContentModel.addARContentTemp(ARContent);
    // get all
    let allTempARContent = await ARContentModel.getTempByActionID(ARContent.actionID);
    res.json(allTempARContent);
  } catch (err) {
    next(err);
  }
})

router.get("/", async (req, res, next) => {
  try {
    //check
    const markerID = req.query.markerID;
    const getMarkerID = await markerModel.getByID(markerID);
    if (getMarkerID.length == 0) {
      res.json([]);
    } else {
      //get
      let getTempARContent = await markerModel.getTempARContent(markerID);
      res.json(getTempARContent);
    }
  } catch (err) {
    next(err);
  }
})

router.post("/newinstance", async (req, res, next) => {
  try {
    let data = req.body.actionID;
    const findByContentID = await ARContentModel.findByID(data.contentID);
    if (findByContentID.length > 0) {
      let addARContentNotTemp = await ARContentModel.addARContentNotTemp(findByContentID[0], data.actionID);
      const ARContentNotTemp = await ARContentModel.findByID(addARContentNotTemp.insertId);
      res.json(ARContentNotTemp[0]);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
  }
})

router.get("/actionid", async (req, res, next) => {
  try {
    const actionID = req.query.actionID;
    const getAction = await actionModel.getByID(actionID);
    if (getAction.length == 0) {
      res.json([]);
    } else {
      //get
      let getARContentNotTemp = await actionModel.getARContentNotTempByActionID(actionID);
      res.json(getARContentNotTemp);
    }
  } catch (err) {
    next(err);
  }
})

router.get("/choosen", async (req, res, next) => {
  try {
    console.log("vc");
    console.log(req.query);
    const getAllARContent = await ARContentModel.getARContentChoosen(req.query.actionID);
    res.json(getAllARContent);
  } catch (err) {
    next(err);
  }
})

router.get("/all", async (req, res, next) => {
  try {
    let actionID = req.query.actionID;
    const getAll = await ARContentModel.getAllARContent(actionID);
    res.json(getAll);
  } catch (err) {
    next(err);
  }
})

// router.get("/that", async (req, res, next) => {
//   try {
//     //check
//     const maDiemDanhDau = req.query.maDiemDanhDau;
//     const getDiemDanhDau = await diemDanhDauModel.getByID(maDiemDanhDau);
//     if (getDiemDanhDau.length == 0) {
//       res.json([]);
//     } else {
//       //get
//       let getArContent = await diemDanhDauModel.getARContentThat(maDiemDanhDau);
//       res.json(getArContent);
//     }
//   } catch (err) {
//     next(err);
//   }
// })

router.post("/text", async (req, res, next) => {
  try {
    let textObject = req.body.textObject;
    let textUpdatedContentID = req.body.textUpdatedContentID;
    console.log(req.body);
    // chen vao noidungAr
    const ARContent = {
      actionID: textObject.actionID,
      xPosition: 0,
      yPosition: 0,
      zPosition: 0,
      xScale: 1,
      yScale: 1,
      zScale: 1,
      URL: "text",
      filename: "text",
      xRotation: 0,
      yRotation: 0,
      zRotation: 0,
      isFile: false,
      isTemp: false
    };
    if (textUpdatedContentID === undefined) {
      let addARContent = await ARContentModel.addARContentNotTemp(ARContent, ARContent.actionID);
      let TextARContent = {
        contentID: addARContent.insertId,
        text: textObject.text,
        font: textObject.font,
        color: textObject.color,
        backgroundColor: textObject.backgroundColor,
        isTransparent: textObject.isTransparent,
        size: textObject.size
      }
      let AddtextARContent = await ARContentModel.addTextARContent(TextARContent);
      // tra ra ma noi dung
      res.json({ contentID: AddtextARContent.insertId, filename: "text" })
    } else {
      // update textARContent
      let TextARContent = {
        text: textObject.text,
        font: textObject.font,
        color: textObject.color,
        backgroundColor: textObject.backgroundColor,
        isTransparent: textObject.isTransparent,
        size: textObject.size
      }
      let updateTextARContent = await ARContentModel.updateTextARContent(TextARContent, textUpdatedContentID);
      res.json({ contentID: textUpdatedContentID, filename: "text" });
    }
  } catch (err) {
    next(err);
  }
})

router.get("/text", async (req, res, next) => {
  try {
    const getTextARContent = await ARContentModel.getTextARContent(req.query.contentID);
    res.json(getTextARContent);
  } catch (err) {
    next(err);
  }
})

router.get("/gettemp", async (req, res, next) => {
  try {
    // get all
    let allTempARContent = await ARContentModel.getTempByActionID(req.query.actionID);
    res.json(allTempARContent);
  } catch (err) {
    next(err);
  }
})

router.patch("/", async (req, res, next) => {
  try {
    let ARContent = req.body.ARContent;
    ARContent.isChoosen = true;
    let updateARContent = await ARContentModel.update(ARContent);
    res.json([]);
  } catch (err) {
    next(err);
  }
})

router.delete("/", async (req, res, next) => {
  try {
    contentID = req.query.contentID;
    await ARContentModel.delete(contentID);
    res.json([]);
  } catch (err) {
    next(err);
  }
})
module.exports = router;