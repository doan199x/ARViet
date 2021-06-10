const db = require('../utils/db');
module.exports = {
    findLecture: async (userid) => {
        const sql = `select *,DATE_FORMAT(timeCreated,'%d/%m/%Y') as created ,DATE_FORMAT(timeCreated,'%d/%m/%Y') as updated from Lesson where (teacherID= "${userid}")
        ORDER BY STR_TO_DATE(timeCreated, '%d/%m/%Y');` 
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