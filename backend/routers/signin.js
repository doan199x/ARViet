const express = require("express");
const router = express.Router();
const signinModel = require("../model/signin.js");
const primaryKey = "ARViet";
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const profile = await signinModel.signin(req.body.email, req.body.password);
    if (profile && (profile.length === 1)) {
      profile[0].MatKhau = "";
     // console.log(JSON.stringify(profile[0]));
      jwt.sign(
        JSON.stringify(profile[0]),
        primaryKey,
        (err,token) => {
          if (err) {
            res.sendStatus(503);
          } else if (token){
            res.send({
              token,
              userID:  profile[0].MaGiaoVien,
              email:  profile[0].email,
              fullname:  profile[0].Ten,
              ID:  profile[0].CMND,
            });
          }
        }
      );
    } else {
      res.send('notfound');
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/token", checkAuthorization, async (req, res) => {
  const profile = await signinModel.findByEmail(req.body.email);
    if (profile[0]) {
       res.send(true);
    } else res.send(false);
});

function checkAuthorization(req, res, next) {
  // check header contain beader
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, primaryKey, function (err, decoded) {
      if (err) {
        res.sendStatus(401);
        return;
      } else {
        req.authorization = decoded;
      }
    });
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
