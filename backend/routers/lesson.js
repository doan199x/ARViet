const express = require("express");
const router = express.Router();
const token = require('../middlewares/token.mdw')
const lessonModel = require('../model/lesson');
const hocsinhModel = require('../model/hocsinh');
router.get("/", token.verify, async (req, res, next) => {
  try {
    console.log(req.authData.hocSinh.TenDangNhap);
    const lesson = await lessonModel.LayDSBG(req.authData.hocSinh.TenDangNhap);
    res.json(lesson);
  } catch (error) {
    next(err);
  }
});

router.post("/", token.verify, async (req, res,next) => {
  try {
    let MaBaiGiang = req.body.MaBaiGiang;
    // Bai giang khong ton tai
    const isExiststed = await lessonModel.checkBaiGiang(MaBaiGiang);
    if (isExiststed.length == 0) {
      res.json({
        status: 'Nhap sai ma bai giang',
        BaiGiang: {
          MaBaiGiang: 1,
          Ten: "",
          MoTa: "",
          TenGiaoVien: ""
        }
      })
    } else {
      // Bai giang da co trong danh sach hien tai
      let TenDangNhap = req.authData.hocSinh.TenDangNhap;
      let checkDSBaiGiang = await lessonModel.checkExistsed(TenDangNhap, MaBaiGiang);
      if (checkDSBaiGiang.length != 0) {
        console.log('here');
        res.json({
          status: 'Ma bai giang da co',
          baiGiang: {
            MaBaiGiang: 1,
            Ten: "",
            MoTa: "",
            TenGiaoVien: ""
          }
        })
      } else {
        // Them vao danh sach bai giang
        let getTenDangNhap = await hocsinhModel.getByTenDangNhap(req.authData.hocSinh.TenDangNhap);
        let maHocSinh = getTenDangNhap[0].MaHocSinh;
        let insertHSBG = await lessonModel.addHSBG(maHocSinh, MaBaiGiang);
        let baiGiang = await lessonModel.getBG(MaBaiGiang);
        console.log(baiGiang);
        if (insertHSBG.affectedRows == 1){
          res.json({
            status: 'Them bai giang thanh cong',
            baiGiang: {
              MaBaiGiang: 1,
              Ten: baiGiang[0].Ten,
              MoTa: baiGiang[0].MoTa,
              TenGiaoVien: baiGiang[0].TenGiaoVien
            }
          })
        }
      }
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;