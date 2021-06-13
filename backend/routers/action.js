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

router.delete("/", async (req, res, next) => {
  try {
    // check xem lieu co con 1 diem hay ko
    let getActions = await actionModel.getByMarkerID(req.query.markerID);
    if (getActions.length == 1) {
      res.json([])
    } else {
      let result = await actionModel.deleteAction(req.query.actionID);
      let getAll = await actionModel.getByMarkerID(req.query.markerID)
      res.json(getAll);
    }
  } catch (err) {
    next(err);
  }
})

router.patch("/", async (req, res, next) => {
  try {
    let changeAction = await actionModel.changeName(req.body.actionID, req.body.actionNameChange);
    let getAll = await actionModel.getByMarkerID(req.body.markerID);
    res.json(getAll);
  } catch (err) {
    next(err);
  }
})

module.exports = router;