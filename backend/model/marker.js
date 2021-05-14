const db = require('../utils/db');
module.exports = {
    add: async (diemDanhDau) => {
        const sql = `INSERT INTO DiemDanhDau(URL,TiLe,MaBaiGiang,filename) VALUES ("${diemDanhDau.URL}",
        ${diemDanhDau.tiLe},${diemDanhDau.maBaiGiang},"${diemDanhDau.filename}");`
        const signup = await db.load(sql);
        return signup;
    },
    uncheckAll: async () => {
        const sql = `UPDATE DiemDanhDau set DuocChon = false`;
        return await db.load(sql);
    },
    getByID: async (maDiemDanhDau) => {
        const sql = `select* from DiemDanhDau where MaDiemDanhDau = ${maDiemDanhDau}`;
        return await db.load(sql);
    },
    updateURL: async (maDiemDanhDau, URL) => {
        const sql = `update DiemDanhDau set URL="${URL}" where MaDiemDanhDau = ${maDiemDanhDau}`;
        return await db.load(sql);
    },
    getARContent: async (maDiemDanhDau) => {
        const sql = `select* from NoiDungAR where maDiemDanhDau = ${maDiemDanhDau} and LaFile = true and LaTam = true`;
        return await db.load(sql);
    },
    getARContentDuocChon: async (maDiemDanhDau) => {
        const sql = `select* from NoiDungAR where maDiemDanhDau = ${maDiemDanhDau} and LaFile = true and LaTam = false`;
        return await db.load(sql);
    },
};