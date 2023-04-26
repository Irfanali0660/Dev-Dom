const jwt = require('jsonwebtoken');
const socket=require('socket.io')
module.exports = {
    sign:(uData)=>{
        console.log("SIGN INSIDE");
        let jwtSecret = process.env.JWT_TOKEN;
        const token = jwt.sign(uData, jwtSecret, { expiresIn: process.env.SESS_TIMOUT }); //1h = 10000
        const decoded = jwt.decode(token);
        return {token,exp:decoded.exp*1000};
    },
    verify:(req,res,next)=>{
        let apiRes = {
            message:'Login required!',
            authenticated:false,
            data:{}
        }
        let jwtSecret = process.env.JWT_TOKEN;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log(req.headers.authorization);
        if (!token) {
          console.log("NO TOCKEN");
          apiRes.message = 'Missing authorization header'
          return res.status(200).json(apiRes);
        }
        
        try {
          console.log("JWT");
          const decoded = jwt.verify(token, jwtSecret);
          res.locals.jwtUSER = decoded;
          console.log(JSON.stringify(res.locals.jwtUSER)+"RES LOCALS");
          next()
        } catch (err) {
          apiRes.message = 'Invalid token'
          res.status(200).json(apiRes);
        }
      },
        verifySocketUserToken:(socket, next)=>{
          let apiRes={}
          const jwtSecret = process.env.JWT_TOKEN;
          const token = socket.handshake.auth.token;
          console.log(token,'tocken');
          try {
            const decoded = jwt.verify(token, jwtSecret);
            socket.jwtUSER = decoded;
            apiRes.authorization = true;
            return next();
          } catch (err) {
            console.log(err);
            return socket.emit('error',apiRes.message) 
          }
        }
     
}