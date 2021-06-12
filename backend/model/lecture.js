const db = require('../utils/db');
module.exports = {
    findLecture: async (userid) => {
        const sql = `select *,DATE_FORMAT(timeCreated,'%d/%m/%Y') as created ,DATE_FORMAT(timeCreated,'%d/%m/%Y') as updated from Lesson where (teacherID= "${userid}")
        ORDER BY STR_TO_DATE(timeCreated, '%d/%m/%Y');` 
        const result = await db.load(sql);
        return result;
    },
    new: async (userid,lecname,description) => {
        const sql = `insert into Lesson(name, description, teacherID,timeCreated,timeUpdated) values ("${lecname}", "${description}", "${userid}",now(),now());`
        // const sql2 = `select max(lessonID) as id from Lesson where ((name = "${lecname}" and description = "${description}") and (teacherID = "${userid}" and timeCreated - now() <= 0));` 
        const result = await db.load(sql);
        // const result2 = await db.load(sql2);
        // if (result.affectedRows ==1 && result2)
        // return result2;
        return result;
    },
    getByID: async(lessonID)=>{
        const sql = `select* from Lesson where lessonID = ${lessonID}`;
        return await db.load(sql);
    },
    getAllMarker: async (lecid) => {
        const sql = `select * from Marker where lessonID = "${lecid}";` 
        const result = await db.load(sql);
        return result;
    },
   deleteLecture: async (lecid) => {
        const sql = `delete from Lesson where lessonID = "${lecid}";` 
        const result = await db.load(sql);
        return result;
    },
};