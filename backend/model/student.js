const db = require('../utils/db');
module.exports = {
    signup: async (student) => {
        const sql = `INSERT INTO Student(name,dateOfBirth,username,password) VALUES ("${student.name}","${student.dateOfBirth}","${student.username}","${student.password}")`;
        const signup = await db.load(sql);
        return signup;
    },
    checkUsername: async (username) => {
        const sql = `Select* from Student where username = "${username}"`;
        const signup = await db.load(sql);
        return signup;
    },
    checkPassword: async (username) => {
        const sql = `Select password from Student where username = "${username}"`;
        return await db.load(sql);
    },
    getByUsername: async (username) => {
        const sql = `Select* from Student where username="${username}"`;
        return await db.load(sql);
    }
};