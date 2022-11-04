const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid");
            }
        }
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
    
})

adminSchema.pre('save', async function (next){
   
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

adminSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this.id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const Admin = mongoose.model('ADMIN', adminSchema)

module.exports = Admin