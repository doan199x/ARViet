const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const token = require('../middlewares/token.mdw')
const bcrypt = require('bcrypt');
const hocSinhModel = require('../model/hocsinh');
router.post("/", async (req, res) => {
});

router.post("/mobile", async (req, res, next) => {
    try {
        const hocSinh = req.body;
        const checkPassword = await hocSinhModel.checkPassword(hocSinh.TenDangNhap);
        if (checkPassword.length == 0) {
            res.json({
                token: '',
                status: 'ten dang nhap khong ton tai',
                TenDangNhap:''
            })
        } else {
            let check = await bcrypt.compare(hocSinh.MatKhau, checkPassword[0].MatKhau);
            if (check == false) {
                res.json({
                    token: '',
                    status: 'sai mat khau',
                    TenDangNhap:''
                })
            } else {
                jwt.sign({ hocSinh }, 'secretkey', (err, token) => {
                    res.json({
                        token: token,
                        status: 'dang nhap thanh cong',
                        TenDangNhap:hocSinh.TenDangNhap
                    })
                });
            }
        }
    } catch (err) {
        next(err);
    }
})

router.get("/", token.verify, async (req, res, next) => {
    console.log(req.authData);
})
module.exports = router;