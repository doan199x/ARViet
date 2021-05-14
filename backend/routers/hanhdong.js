const express = require("express");
const router = express.Router();
const hanhDongModel = require('../model/hanhdong');
const diemDanhDauModel = require('../model/marker');

router.get("/khoitao", async (req, res, next) => {
    try {
        let maDiemDanhDau = req.query.maDiemDanhDau;
        let getKhoiTao = await hanhDongModel.getKhoiTao(maDiemDanhDau);
        res.json({ maHanhDongKhoiTao: getKhoiTao[0].MaDiemDanhDau });
    }
    catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let noiDung = req.body.noiDung;
        let maDiemDanhDau = req.body.maDiemDanhDau;
        let themHanhDong = await hanhDongModel.insertHanhDong(noiDung, maDiemDanhDau);
        console.log(themHanhDong);
        res.json({ maHanhDong: themHanhDong.insertId })
    } catch (err) {
        next(err);
    }
})

router.get("/",async(req,res,next)=>{
    try{
        let maDiemDanhDau = req.query.maDiemDanhDau;
        let getHanhDong = await hanhDongModel.getByDiemDanhDau(maDiemDanhDau);
        res.json(getHanhDong);
    }catch(err){
        next(err);
    }
})

module.exports = router;