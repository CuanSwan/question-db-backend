import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error: 'Access denied'});
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET)
        req.userId = decoded.userId;
        next();
    } catch (error){
        res.status(401).json({error: 'Invalid token'})
    }
}