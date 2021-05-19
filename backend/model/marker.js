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
    getByID: async (markerID) => {
        const sql = `select* from Marker where markerID = ${markerID}`;
        return await db.load(sql);
    },
    updateURL: async (markerID, URL) => {
        const sql = `update Marker set URL="${URL}" where markerID = ${markerID}`;
        return await db.load(sql);
    },
    getTempARContent: async (markerID) => {
        const sql = `select* from ARContent as a, Action as b where b.markerID = ${markerID} 
        and a.isFile = true and isTemp = true and b.actionID = a.actionID`;
        return await db.load(sql);
    },
    getARContentThat: async (maDiemDanhDau) => {
        const sql = `select* from NoiDungAR as a, HanhDong as b where b.MaDiemDanhDau = ${maDiemDanhDau} 
        and a.LaFile = true and LaTam = false and b.MaHanhDong = a.MaHanhDong`;
        return await db.load(sql);
    },
    addMarker: async (lecid, URL) => {
        const sql = `insert into Marker (lessonID,URL,scale) values (${lecid},"${URL}",1);`
        const result = await db.load(sql);
        return result;
    },
};