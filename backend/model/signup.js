const db = require('../utils/db');
module.exports = {
    checkEmail: async (email) => {
        const sql = `select count(*) as count from GiaoVien where Email= "${email}"`;
        const isExisted = await db.load(sql);
        return isExisted;
    },
    signup: async (fullname, id, email,password) => {
        const sql = `INSERT INTO GiaoVien(Ten, CMND, Email,MatKhau) VALUES ("${fullname}", "${id}", "${email}","${password}");` 
        const signup = await db.load(sql);
        return signup;
    }
};