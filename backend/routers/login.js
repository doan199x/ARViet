const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const token = require('../middlewares/token.mdw')
router.post("/", async (req, res) => {
});

router.post("/mobile",async(req,res,next)=>{
    try{
        const user = {
            username:'sacsadsa',
            email:'asdasdsad'
        }
        jwt.sign({user},'secretkey',(err,token)=>{
            res.json({
                token
            })
        });
    }catch(err){
        next(err);
    }
})

router.get("/",token.verify,async(req,res,next)=>{
    console.log(req.authData);
})
module.exports = router;