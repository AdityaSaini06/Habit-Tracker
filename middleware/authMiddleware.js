import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer")){
        return res.status(401).json({message : "Access Denied , Token is missing"});
    }

    const token = header.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid or Expired Token"});
    }
}

export default verifyToken;