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
        const sql = `select* from NoiDungAR as a, HanhDong as b where b.MaDiemDanhDau = ${maDiemDanhDau} 
        and a.LaFile = true and LaTam = true and b.MaHanhDong = a.MaHanhDong`;
        return await db.load(sql);
    },
    getARContentThat: async (maDiemDanhDau) => {
        const sql = `select* from NoiDungAR as a, HanhDong as b where b.MaDiemDanhDau = ${maDiemDanhDau} 
        and a.LaFile = true and LaTam = false and b.MaHanhDong = a.MaHanhDong`;
        return await db.load(sql);
    },
    addMarker: async (lecid) => {
        const sql = `insert into DiemDanhDau (MaBaiGiang) values ("${lecid}");` 
        const result = await db.load(sql);
        return result;
    },
};