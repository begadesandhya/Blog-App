const jwt = require('jsonwebtoken');
var Admin = require('../model/admin');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser());
const Authenticate = async (req, res, next) =>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Admin.findOne({_id:verifyToken._id, "tokens.token": token});
        if(!user){
            throw new Error('user not found');
        }
        req.token = token;
        req.user = user;
        req.userid = user._id;

        next();
    }catch (err){
        res.redirect('/');
        console.log(err);
    }
}

module.exports = Authenticate;