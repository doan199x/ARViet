const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const token = require('../middlewares/token.mdw')
const bcrypt = require('bcrypt');
const studentModel = require('../model/student');
router.post("/", async (req, res) => {
});

router.post("/mobile", async (req, res, next) => {
    try {
        let student = req.body;
        const checkPassword = await studentModel.checkPassword(student.username);
        if (checkPassword.length == 0) {
            res.json({
                token: '',
                status: 'username is not existed',
                username: ''
            })
        } else {
            let check = await bcrypt.compare(student.password, checkPassword[0].password);
            if (check == false) {
                res.json({
                    token: '',
                    status: 'password is incorrect',
                    username: ''
                })
            } else {
                jwt.sign({ student }, 'secretkey', (err, token) => {
                    res.json({
                        token: token,
                        status: 'login sucessfully',
                        username: student.username
                    })
                });
            }
        }
    } catch (err) {
        next(err);
    }
})

router.get("/", token.verify, async (req, res, next) => {
    console.log(req.authData);
})
module.exports = router;