const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true},(err)=>{
    if(err) throw err;
    console.log('Database connected');
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

//model
const {User}= require('./model/user_sch');

app.post('/register',(req,res)=>{
    console.log(req.body)

    const user = new User(req.body);
    user.save((err,data)=>{
        if(err) throw err;
        res.send(data)
    });
});




const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});