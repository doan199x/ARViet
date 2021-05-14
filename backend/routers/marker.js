const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const diemDanhDauModel = require('../model/marker');
//multer marker
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, 'public/uploads/marker')
  },
  filename: function (req, file, next) {
    if (file.originalname[file.originalname.length - 1] == 'g' && (file.originalname[file.originalname.length - 2] == 'n')) {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.png')
    } else if (file.originalname[file.originalname.length - 1] == 'g' && (file.originalname[file.originalname.length - 2] == 'p')) {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.jpg')
    }
  }
})

var upload = multer({
  storage: storage,
})
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    // Luu marker vao danh sach
    const maBaiGiang = 1;
    const maDiemDanhDau = 1;
    const diemDanhDau = {
      'maBaiGiang': maBaiGiang,
      'URL': 'http://localhost:3001/uploads/marker/' + req.file.filename,
      'tiLe': 1,
      'filename': req.file.filename,
      'maDiemDanhDau': maDiemDanhDau
    }
    // Neu ton tai thi update, khong thi insert
    const getDiemDanhDau = await diemDanhDauModel.getByID(maDiemDanhDau);
    if (getDiemDanhDau.length == 0){
      diemDanhDauModel.add(diemDanhDau);
    }else{
      diemDanhDauModel.updateURL(diemDanhDau.maDiemDanhDau,diemDanhDau.URL);
    }
    console.log(getDiemDanhDau);
    res.json({
      'filenname': req.file.filename,
      'URL': 'http://localhost:3001/uploads/marker/' + req.file.filename
    })
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const maBaiGiang = req.query.maBaiGiang;
    const maDiemDanhDau = req.query.maDiemDanhDau;
    const getDiemDanhDau = await diemDanhDauModel.getByID(maDiemDanhDau);
    res.json(getDiemDanhDau);
  } catch (err) {
    next(err);
  }
})

module.exports = router;