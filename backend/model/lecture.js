const db = require('../utils/db');
module.exports = {
    findLecture: async (userid) => {
        const sql = `select * from BaiGiang where (MaGiaoVien= "${userid}");` 
        const result = await db.load(sql);
        return result;
    },
    new: async (userid,lecname,description) => {
        const sql = `insert into BaiGiang(Ten, MoTa, MaGiaoVien,ThoiGianTao,ThoiGianCapNhat) 
        values ("${lecname}", "${description}", "${userid}",now(),now());` 
        const result = await db.load(sql);
        return result;
    },
};