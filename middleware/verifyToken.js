import jwt from "jsonwebtoken";

export const verifyToken =(role) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if(!token) return res.status(401).json({error: 'Access denied'});
        const allowedRoles = {
            free: ["free", "paid", "admin"],
            paid: ["paid", "admin"],
            admin: ["admin"]
        }
        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
            if (!allowedRoles[role].inludes(decoded.role)){
                throw(new Error('Invalid Token'))
            }
            req.userId = decoded.userId;
            next();
        } catch (error){
            res.status(401).json({error: 'Invalid token'})
        }
    }
}