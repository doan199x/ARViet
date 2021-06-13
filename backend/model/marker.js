const db = require('../utils/db');
module.exports = {
    uncheckAll: async () => {
        const sql = `UPDATE DiemDanhDau set DuocChon = false`;
        return await db.load(sql);
    },
    getByID: async (markerID) => {
        const sql = `select* from Marker where markerID = ${markerID}`;
        return await db.load(sql);
    },
    updateURL: async (markerID, URL) => {
        const sql = `update Marker set URL="${URL}" where markerID = ${markerID}`;
        return await db.load(sql);
    },
    getTempARContent: async (markerID) => {
        const sql = `select* from ARContent as a, Action as b where b.markerID = ${markerID} 
        and a.isFile = true and isTemp = true and b.actionID = a.actionID`;
        return await db.load(sql);
    },
    addMarker: async (lecid, URL) => {
        const sql = `insert into Marker (lessonID,URL,scale) values (${lecid},"${URL}",1);`
        const result = await db.load(sql);
        return result;
    },
    getByLessonID: async (lessonID) => {
        const sql = `select* from Marker where lessonID = ${lessonID}`;
        return await db.load(sql);
    },
    setMarkerScale: async (markerScale, markerID) => {
        const sql = `update Marker set scale = ${markerScale} where markerID = ${markerID}`;
        return await db.load(sql);
    },
    getAll: async () => {
        const sql = `select* from Marker`;
        return await db.load(sql);
    },
    deleteMarker: async (markerID) => {
        const sql = `delete from Marker where markerID=${markerID}`;
        return await db.load(sql);
    }
};