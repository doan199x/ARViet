const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const lessonModel = require('../model/lesson');
router.get("/",token.verify, async (req, res) => {
  try {
      console.log(req.authData.hocSinh.TenDangNhap);
    const lesson = await lessonModel.LayDSBG(req.authData.hocSinh.TenDangNhap);
    res.json(lesson);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;