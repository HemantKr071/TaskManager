import jwt from 'jsonwebtoken';

const auth = (roles = []) => {
  
    return (req, res, next) => {
   
         const token = req.cookies?.token; 
   
    if (!token){

        return res.status(401).json({
            error:"Invalid Token!!"
        });

    } 

    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
     
      if (roles.length && !roles.includes(decoded.role)){
        console.log("Access Denied");
        return res.sendStatus(403).json({
            error:"Access Denied"
        });
      }
      next();
    
    } catch (err) {
      res.sendStatus(403).json({
        error:"Some error has occured"
      });
    }
  };
};

export default auth;
