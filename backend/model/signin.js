const db = require('../utils/db');
module.exports = {
    signin: async (email,password) => {
        const sql = `select * from Teacher where (email= "${email}" and password = "${password}");` 
        const signin = await db.load(sql);
        return signin;
    },
    findByEmail: async (email) => {
        const sql = `select * from Teacher where (email= "${email}");` 
        const signin = await db.load(sql);
        return signin;
    }
};