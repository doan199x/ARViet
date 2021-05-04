const jwt = require("jsonwebtoken");
module.exports={
    verify:(req,res,next)=>{
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader != 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, 'secretkey',(err, authData)=>{
                if(err){
                    res.sendStatus(403);
                }else{
                    req.authData = authData;
                    next();
                }
            })
        }else{
            res.sendStatus(403);
        }
    }
}