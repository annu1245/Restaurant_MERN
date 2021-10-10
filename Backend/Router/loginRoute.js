const express = require('express');
const logRoute = express.Router();
const AuthDB = require('../DB/AuthDB')

logRoute.get('/', (req,res)=>{
    res.send("WElcom")
})

logRoute.post('/login',async(req,res)=>{
    var status;
    const emailId = req.body.email;
    const pass = req.body.password;


    AuthDB.findOne({email : emailId}, (err,data)=>{
        if (err){console.log(err)}
        else if(data == null){
            console.log(data);
            res.send({state : 0});
        }
        else if(data.password === pass){
            console.log(data);
            res.send({state : 1})
        }
        else{
            console.log(data);
            res.send({state : 0})
        }
    })
})



module.exports = logRoute;