const db = require('../utils/db');
module.exports = {
    getLessonList: async (username) => {
        const sql = `select b.lessonID, b.name, b.description,c.name as teacherName from StudentLesson as a, Lesson as b, Teacher as c, Student as d where d.username = '${username}' and a.studentID = d.studentID and a.lessonID = b.lessonID and b.teacherID = c.teacherID;`;
        const isExisted = await db.load(sql);
        return isExisted;
    },
    checkLesson: async (lessonID) => {
        const sql = `select* from Lesson where lessonID = ${lessonID}`;
        return await db.load(sql);
    },
    checkExistsed: async (username, lessonID) => {
        const sql = `select a.username from Student as a, StudentLesson as b where a.studentID = b.studentID and a.username = "${username}" and b.lessonID = ${lessonID}`;
        return await db.load(sql);
    },
    addStudentLesson: async (studentID, lessonID) => {
        const sql = `insert into StudentLesson (studentID,lessonID) values(${studentID},${lessonID})`;
        return await db.load(sql);
    },
    getLessonByID: async (lessonID) => {
        const sql = `select a.name, a.description, b.name as teacherName from Lesson as a, Teacher as b where a.lessonID = "${lessonID}" and a.teacherID = b.teacherID`;
        return await db.load(sql);
    }
};