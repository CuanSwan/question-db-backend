import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';


 
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({email})
    const passMatch = await bcrypt.compare(password, userExists.password)
    const role = userExists.role;
    if(userExists && passMatch){
        console.log('UserFound')
        console.log(userExists)
        const token = jwt.sign({email, role}, process.env.SECRET, {expiresIn: "5h"})
        res.status(200).json(token)
    }else{
        res.send('Email or password incorrect.')
    }
}

export const fetchUser = async (req, res) => {
    const token = req.header('Authorization')
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
    const usermail = decoded.email;
    console.log(decoded.email)
    const user = await User.findOne({email:usermail})
    console.log(user)
    res.status(202).json(user)
}

export const userRegister = async (req, res) => {
    const user = req.body;
    console.log(user)
    const email = user.email
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(409).json('User already exists');
    }else{
        user.createdAt = new Date().toUTCString();
        user.progress = 0;
        user.token = "";
        user.active = true;
        user.password = await bcrypt.hash(user.password, 10)
        console.log(user);
        try{
            await User.create(user)
            res.status(200).send("OK");
        }catch (err){
            console.error(err)
        } 
    }
};
