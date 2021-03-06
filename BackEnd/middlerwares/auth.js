const jwt = require("jsonwebtoken");
const User = require("../database/models/Users");

const middlewareController = {

    verifyToken:(req,res,next)=>{
        // const token = decodeURIComponent(req.headers.cookie);
        const token = decodeURIComponent(req.cookies.accessToken);
        // Authrization : 
        // token 
        if(token){
            const accessToken=token;
           try{
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                   return res.json({message: `${err}`});
                }
                req.user=user;
                next();
            });
           }catch(err){
                console.log(error);
              return  res.sendStatus(403);
           }
        }
        else{
          return  res.status(401).json({message: "You're not authenticated"});
        }
  
  },
};

module.exports=middlewareController.verifyToken;