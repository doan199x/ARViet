const db = require('../utils/db');
module.exports = {
    checkEmail: async (email) => {
        const sql = `select count(*) as count from Teacher where email= "${email}"`;
        const isExisted = await db.load(sql);
        return isExisted;
    },
    signup: async (fullname, id, email,password) => {
        const sql = `INSERT INTO Teacher(name, iNumber, email,password) VALUES ("${fullname}", "${id}", "${email}","${password}");` 
        const signup = await db.load(sql);
        return signup;
    }
};