const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const diemDanhDauModel = require('../model/marker');
const noiDungArModel = require('../model/noidungar');
const hanhDongModel = require('../model/hanhdong');

//ar content
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, 'public/uploads/arcontent')
  },
  filename: function (req, file, next) {
    if (file.originalname[file.originalname.length - 1] == 'f') {
      next(null, file.originalname.substr(0, file.originalname.length - 5) + '-' + Date.now() + '.gltf')
    } else if (file.originalname[file.originalname.length - 1] == 'b') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.glb')
    } else if (file.originalname[file.originalname.length - 1] == 'g' && (file.originalname[file.originalname.length - 2] == 'n')) {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.png')
    } else if (file.originalname[file.originalname.length - 1] == 'g' && (file.originalname[file.originalname.length - 2] == 'p')) {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.jpg')
    } else if (file.originalname[file.originalname.length - 1] == '4') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.mp4')
    } else if (file.originalname[file.originalname.length - 1] == '3') {
      next(null, file.originalname.substr(0, file.originalname.length - 4) + '-' + Date.now() + '.mp3')
    }
  }
})

var upload = multer({
  storage: storage,
})
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const noiDungAR = {
      MaHanhDong: req.body.maHanhDongHienTai,
      ToaDoX: 0,
      ToaDoY: 0,
      ToaDoZ: 0,
      TiLeX: 1,
      TiLeY: 1,
      TiLeZ: 1,
      URL: 'http://localhost:3001/uploads/arcontent/' + req.file.filename,
      CapDo: 0,
      filename: req.file.filename,
      XoayX: 0,
      XoayY: 0,
      XoayZ: 0,
      LaFile: true,
      LaTam: true
    };
    let addNoiDungAR = await noiDungArModel.addNoiDungAR(noiDungAR);
    res.json({ 'filenname': req.file.filename });
  } catch (err) {
    next(err);
  }
})

router.get("/", async (req, res, next) => {
  try {
    //check
    const maDiemDanhDau = req.query.maDiemDanhDau;
    const getDiemDanhDau = await diemDanhDauModel.getByID(maDiemDanhDau);
    if (getDiemDanhDau.length == 0) {
      res.json([]);
    } else {
      //get
      let getArContent = await diemDanhDauModel.getARContent(maDiemDanhDau);
      res.json(getArContent);
    }
  } catch (err) {
    next(err);
  }
})

router.patch("/", async (req, res, next) => {
  try {
    let data = req.body.MaNoiDung;
    console.log(data);
    const findByMaNoiDung = await noiDungArModel.findByMaNoiDung(data.MaNoiDung);
    if (findByMaNoiDung.length > 0) {
      let addNoiDungARDuocChon = await noiDungArModel.addNoiDungARDuocChon(findByMaNoiDung[0], data.MaHanhDong);
      const ArContentDuocChon = await noiDungArModel.findByMaNoiDung(addNoiDungARDuocChon.insertId);
      res.json(ArContentDuocChon[0]);
    } else {
      res.json([]);
    }
  } catch (err) {
    next(err);
  }
})

router.get("/duocchon", async (req, res, next) => {
  try {
    const maHanhDong = req.query.maHanhDong;
    const getHanhDong = await hanhDongModel.getByID(maHanhDong);
    if (getHanhDong.length == 0) {
      res.json([]);
    } else {
      //get
      let getArContent = await hanhDongModel.getARContentDuocChon(maHanhDong);
      res.json(getArContent);
    }
  } catch (err) {
    next(err);
  }
})

router.get("/hanhdong", async (req, res, next) => {
  try {
    let maHanhDong = req.query.maHanhDong;
    const getNoiDungAR = await noiDungArModel.getNoiDungARByHanhDong(maHanhDong);
    res.json(getNoiDungAR);
  } catch (err) {
    next(err);
  }
})

router.get("/that", async (req, res, next) => {
  try {
    //check
    const maDiemDanhDau = req.query.maDiemDanhDau;
    const getDiemDanhDau = await diemDanhDauModel.getByID(maDiemDanhDau);
    if (getDiemDanhDau.length == 0) {
      res.json([]);
    } else {
      //get
      let getArContent = await diemDanhDauModel.getARContentThat(maDiemDanhDau);
      res.json(getArContent);
    }
  } catch (err) {
    next(err);
  }
})

router.post("/text", async (req, res, next) => {
  try {
    let textObject = req.body.textObject;
    // chen vao noidungAr
    const noiDungAR = {
      MaHanhDong: textObject.MaHanhDong,
      ToaDoX: 0,
      ToaDoY: 0,
      ToaDoZ: 0,
      TiLeX: 1,
      TiLeY: 1,
      TiLeZ: 1,
      URL: "text",
      filename: "text",
      XoayX: 0,
      XoayY: 0,
      XoayZ: 0,
      LaFile: false,
      LaTam: false
    };
    let addNoiDungAR = await noiDungArModel.addNoiDungAR(noiDungAR);
    // chen vao noidungartext
    const noiDungARVanBan = {
      MaNoiDung: addNoiDungAR.insertId,
      NoiDungVanBan: textObject.noiDung,
      FontChu: textObject.fontChu,
      MauChu: textObject.mauChu,
      MauNen: textObject.mauNen,
      TrongSuot: textObject.transparent,
      CoChu: textObject.coChu
    }
    let addNoiDungARVanBan = await noiDungArModel.addNoiDungARVanBan(noiDungARVanBan);
    // tra ra ma noi dung
    res.json({ MaNoiDung: addNoiDungARVanBan.insertId })
  } catch (err) {
    next(err);
  }
})

router.get("/text",async (req,res,next)=>{
  try{
    const getNoiDungVanBan = await noiDungArModel.getNoiDungVanBan(req.query.MaNoiDung);
    console.log(getNoiDungVanBan);
    res.json(getNoiDungVanBan);
  }catch(err){
    next(err);
  }
})

router.post("/noidung",async(req,res,next)=>{
  try{
    let noiDungUpdate = req.body.NoiDungAR;
    let updateNoiDung = await noiDungArModel.update(noiDungUpdate);
    res.json([]);
  }catch(err){
    next(err);
  }
})
module.exports = router;