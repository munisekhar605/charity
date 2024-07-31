const jwt=require('jsonwebtoken');
const userAuthentication=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log(token)
    if(!token){
     res.status(401);
    }
    jwt.verify(token,'munisekhar',(err,decoded)=>{
        if(err){
          res.status(401);
        }
        req.jwtId=decoded.id

        next();
    })
}
module.exports=userAuthentication
