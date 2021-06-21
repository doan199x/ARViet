const db = require('../utils/db');
module.exports = {
    addARContentTemp: async (ARContent) => {
        const sql = `insert into ARContent (xPosition,yPosition,zPosition,xRotation,yRotation,zRotation,xScale,yScale,zScale,URL,actionID,filename,isFile,isTemp)
        values(${ARContent.xPosition},${ARContent.yPosition},${ARContent.zPosition},${ARContent.xRotation},${ARContent.yRotation},${ARContent.zRotation},${ARContent.xScale},${ARContent.yScale},${ARContent.zScale},"${ARContent.URL}",${ARContent.actionID}
        ,"${ARContent.filename}",${ARContent.isFile},${ARContent.isTemp});`
        return await db.load(sql);
    },
    findByID: async (contentID) => {
        const sql = `select* from ARContent where contentID = ${contentID}`
        return await db.load(sql);
    },
    addARContentNotTemp: async (ARContent, actionID) => {
        const sql = `insert into ARContent (xPosition,yPosition,zPosition,xRotation,yRotation,zRotation,xScale,yScale,zScale,URL,actionID,filename,isFile,isTemp)
        values(${ARContent.xPosition},${ARContent.yPosition},${ARContent.zPosition},${ARContent.xRotation},${ARContent.yRotation},${ARContent.zRotation},${ARContent.xScale},${ARContent.yScale},${ARContent.zScale},"${ARContent.URL}",${actionID}
        ,"${ARContent.filename}",${ARContent.isFile},false);`
        return await db.load(sql);
    },
    getARContentChoosen: async (actionID) => {
        const sql = `select* from ARContent where actionID = ${actionID} and isTemp = false and isChoosen = true`;
        return await db.load(sql);
    },
    getAllARContent: async (actionID) => {
        const sql = `select* from ARContent where actionID = ${actionID} and isTemp = false`;
        return await db.load(sql);
    },
    delete: async (contentID) => {
        const sql = `delete from ARContent where contentID = ${contentID}`;
        return await db.load(sql);
    },
    addTextARContent: async (textARContent) => {
        const sql = `insert into TextARContent (contentID,text,font,color,backgroundColor,isTransparent,size)
        values(${textARContent.contentID},"${textARContent.text}","${textARContent.font}"
        ,"${textARContent.color}","${textARContent.backgroundColor}",${textARContent.isTransparent},${textARContent.size})`;
        return await db.load(sql);
    },
    getTextARContent: async (contentID) => {
        const sql = `select* from TextARContent where contentID = ${contentID}`;
        return await db.load(sql);
    },
    update: async (ARContent) => {
        const sql = `update ARContent set xPosition = ${ARContent.xPosition}, yPosition = ${ARContent.yPosition}, zPosition = ${ARContent.zPosition},
        xScale = ${ARContent.xScale},yScale = ${ARContent.yScale},zScale = ${ARContent.zScale},
        xRotation = ${ARContent.xRotation},yRotation = ${ARContent.yRotation},zRotation = ${ARContent.zRotation},isChoosen = ${ARContent.isChoosen},
        fatherID = ${ARContent.fatherID}, fatherName = "${ARContent.fatherName}"
        where contentID = ${ARContent.contentID};
        `
        return await db.load(sql);
    },
    deleteTextARContent: async (contentID) => {
        const sql = `delete from textARContent where contentID = ${contentID}`;
        return await db.load(sql);
    },
    updateTextARContent: async (textARContent, contentID) => {
        const sql = `update TextARContent set text="${textARContent.text}",size=${textARContent.size},color="${textARContent.color}",
        backgroundColor = "${textARContent.backgroundColor}",isTransparent = ${textARContent.isTransparent}, font="${textARContent.font}"
        where contentID = ${contentID}
        `
        return await db.load(sql);
    },
    getByActionID: async (actionID) => {
        const sql = `select* from ARContent where actionID = ${actionID} and isChoosen = true`;
        return await db.load(sql);
    },
    getTempByActionID: async (actionID) => {
        const sql = `select* from ARContent where actionID = ${actionID} and isTemp = true and isFile = true`;
        return await db.load(sql);
    },
    getARContentByID: async (contentID) => {
        const sql = `select* from ARContent where contentID=${contentID}`;
        return await db.load(sql);
    }
};