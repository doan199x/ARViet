const db = require('../utils/db');
module.exports = {
    signin: async (email,password) => {
        const sql = `select * from GiaoVien where (Email= "${email}" and MatKhau = "${password}");` 
        const signin = await db.load(sql);
        return signin;
    },
    findByEmail: async (email) => {
        const sql = `select * from GiaoVien where (Email= "${email}");` 
        const signin = await db.load(sql);
        return signin;
    }
};