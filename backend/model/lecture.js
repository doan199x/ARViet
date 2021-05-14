const db = require('../utils/db');
module.exports = {
    findLecture: async (userid) => {
        const sql = `select * from BaiGiang where (MaGiaoVien= "${userid}");` 
        const signin = await db.load(sql);
        return signin;
    },
};