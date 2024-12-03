import jwt from "jsonwebtoken";

export const verifyToken =(role) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        
        if(!token) return res.status(401).json({error: 'Access denied'});
        const allowedRoles = {
            "free": ["free", "paid", "admin"],
            "paid": ["paid", "admin"],
            "admin": ["admin"]
        }
        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
            console.log(!allowedRoles[role].includes(decoded.role.toLowerCase()))
            if (!allowedRoles[role].includes(decoded.role.toLowerCase())){
                
                throw(new Error('Invalid Token'))
            }
            req.userId = decoded.userId;
            next();
        } catch (error){
            if (error instanceof jwt.JsonWebTokenError) {
                res.status(498).json("OOOPS Something went wrong")
            }else{
                res.status(401).json({error: 'Invalid token'})
                }
            
        }
    }
}