var Admin = require('../model/admin');
require('../database/connection');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
    const email = req.body.email;
         
    Admin.findOne({email:email})
    .then((adminExist) => {
        if(adminExist){
            return res.status(422).json({ error: "email already exist"});
        }
        const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        });

        admin.save().then(data => {
        //res.send(data)
        res.redirect('/');
        //return res.status(201).json({ error: "user register"});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error in createing user"
        });
    });
    }).catch(err => {console.log(err);});  
}




