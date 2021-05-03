const db = require('../utils/db');
module.exports = {
    checkEmail: async (email) => {
        const sql = `SELECT COUNT(*) as count FROM GiaoVien WHERE (Email = "${email}");` 
        const isExisted = await db.load(sql);
        return isExisted;
    },
    signup: async (email,password) => {
        const sql = `INSERT INTO GiaoVien(Email,MatKhau) VALUES ("${email}","${password}");` 
        const signup = await db.load(sql);
        return signup;
    }
};