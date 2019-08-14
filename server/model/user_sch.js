const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({

    name :{
        type:String,
        required:true,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password : {
        type:String,
        required:true,
        minlength:5
    },
    token:{
        type:String
    }
});

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    return next(err)
                }
                user.password =hash;
                next();
            })
        })
    }else{
        next();
    }
});



const User = mongoose.model('User',userSchema);

module.exports = {User}