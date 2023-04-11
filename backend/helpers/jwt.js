const jwt = require('jsonwebtoken');

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
        console.log(req.socket.remoteAddress);
        const token = authHeader && authHeader.split(' ')[1];
      
        if (!token) {
            apiRes.message = 'Missing authorization header'
          return res.status(200).json(apiRes);
        }
      
        try {
          const decoded = jwt.verify(token, jwtSecret);
          res.locals.jwtUSER = decoded;
          // console.log(JSON.stringify(res.locals.jwtUSER)+"RES LOCALS");
          next()
        } catch (err) {
            apiRes.message = 'Invalid token'
          res.status(200).json(apiRes);
        }
    }
}