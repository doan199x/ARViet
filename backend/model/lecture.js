const db = require('../utils/db');
module.exports = {
    findLecture: async (userid) => {
        const sql = `select * from Lesson where (teacherID= "${userid}");` 
        const result = await db.load(sql);
        return result;
    },
    new: async (userid,lecname,description) => {
        const sql = `insert into Lesson(name, description, teacherID,timeCreated,timeUpdated)
        values ("${lecname}", "${description}", "${userid}",now(),now());` 
        const result = await db.load(sql);
        return result;
    },
    getAllMarker: async (lecid) => {
        const sql = `select * from Marker where lessonID = "${lecid}";` 
        const result = await db.load(sql);
        return result;
    },
};