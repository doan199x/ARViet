const express = require("express");
const router = express.Router();
const actionModel = require('../model/action');
const ARContentModel = require('../model/arcontent');

router.get("/init", async (req, res, next) => {
    try {
        let markerID = req.query.markerID;
        let getInit = await actionModel.getInit(markerID);
        res.json(getInit);
    }
    catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let name = req.body.name;
        let markerID = req.body.markerID;
        let addAction = await actionModel.addAction(name, markerID);
        //get all
        let allAction = await actionModel.getByMarkerID(markerID);
        console.log(allAction);
        res.json(allAction);
    } catch (err) {
        next(err);
    }
})

router.get("/", async (req, res, next) => {
    try {
        let markerID = req.query.markerID;
        let getAction = await actionModel.getByMarkerID(markerID);
        res.json(getAction);
    } catch (err) {
        next(err);
    }
})

module.exports = router;