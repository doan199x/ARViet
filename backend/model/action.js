const db = require('../utils/db');
module.exports = {
    add: async (markerID, name) => {
        const sql = `INSERT INTO Action (markerID,name) values(${markerID},"${name}")`;
        return await db.load(sql);
    },
    getInit: async (markerID) => {
        const sql = `select* from Action where markerID = ${markerID}`;
        return await db.load(sql);
    },
    getByID: async (actionID) => {
        const sql = `select* from Action where actionID = ${actionID}`;
        return await db.load(sql);
    },
    getARContentNotTempByActionID: async (actionID) => {
        const sql = `select* from ARContent where actionID = ${actionID} and isFile = true and isTemp = false`;
        return await db.load(sql);
    },
    addAction: async (name, markerID) => {
        const sql = `insert into Action (name,markerID) values("${name}",${markerID})`;
        return await db.load(sql);
    },
    getByMarkerID: async (markerID) => {
        const sql = `select* from Action where markerID = ${markerID}`;
        return await db.load(sql);
    },
    deleteAction: async(actionID)=>{
        const sql= `delete from Action where actionID = ${actionID}`;
        return await db.load(sql);
    },
    changeName: async(actionID,name)=>{
        const sql=`update Action set name="${name}" where actionID=${actionID}`;
        return await db.load(sql);
    }
};