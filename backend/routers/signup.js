const express = require("express");
const router = express.Router();
const signupModel = require("../model/signup.js");
router.post("/", async (req, res) => {
  try {
    const isExisted = await signupModel.checkEmail(req.body.email);
    if (isExisted && isExisted[0].count != 0) {
      res.send("existed");
    } else {
      const result = await signupModel.signup(
        req.body.fullname,
        req.body.id,
        req.body.email,
        req.body.password
      );
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/mobile", async (req, res) => {
  const hocSinh = req.body;
  const salt = bcrypt.genSaltSync(10);
  hocSinh.MatKhau = bcrypt.hashSync(hocSinh.MatKhau, salt);
  const isExisted = await hocSinhModel.checkTenDangNhap(hocSinh.TenDangNhap);
  console.log(isExisted.length);
  if (isExisted.length!=0){
    res.json({
      status:'Ten Dang Nhap da ton tai'
    })
  }else{
    const result = await hocSinhModel.signup(hocSinh);
    let status = "failed";
    if (result.affectedRows==1){
      status = 'success'
    }
    res.json({
      status:status
    });
  }
})
module.exports = router;
