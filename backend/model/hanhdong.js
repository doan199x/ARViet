const db = require('../utils/db');
module.exports = {
    add: async (maDiemDanhDau) => {
        const sql = `INSERT INTO HanhDong (NoiDung,MaDiemDanhDau) values("Khởi tạo",${maDiemDanhDau})`;
        return await db.load(sql);
    },
    getKhoiTao: async () => {
        const sql = `select* from HanhDong where NoiDung = "Khởi tạo"`;
        return await db.load(sql);
    },
    getByID: async (MaHanhDong) => {
        const sql = `select* from HanhDong where MaHanhDong = ${MaHanhDong}`;
        return await db.load(sql);
    },
    getARContentDuocChon: async (MaHanhDong) => {
        const sql = `select* from NoiDungAR where MaHanhDong = ${MaHanhDong} and LaFile = true and LaTam = false`;
        return await db.load(sql);
    },
    insertHanhDong: async (NoiDung, MaDiemDanhDau) => {
        const sql = `insert into HanhDong (NoiDung,MaDiemDanhDau) values("${NoiDung}",${MaDiemDanhDau})`;
        return await db.load(sql);
    },
    getByDiemDanhDau: async (MaDiemDanhDau)=>{
        const sql = `select* from HanhDong where MaDiemDanhDau = ${MaDiemDanhDau}`;
        return await db.load(sql);
    }
};