const axios = require('axios');
//const bcrypt = require('bcrypt');
//const nodemailer = require("nodemailer");
//var Blog = require('../model/addBlog_model.js');


exports.add_blog = (req,res)=>{
    axios.get('http://localhost:3000/allblogcategory')
    .then(function(response){
    console.log(response);
        res.render('add_blog', {allblogcategory:response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}





