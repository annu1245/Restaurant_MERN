const express = require('express');
const userRoute = express.Router();
const User = require('../DB/UserDB')

userRoute.get('/', (req,res)=>{
    res.send("user Route")
})


userRoute.post('/register', async(req,res) => {
    const emailId = req.body.email;
    let status;
    User.findOne({email : emailId}, async(err,userdata) => {
       if(err){console.log(err)}
        console.log(userdata);
        if (userdata){
            return res.send({status : 0});
        }
        
        const user = new User({
            userName : req.body.userName,
            email : req.body.email,
            password : req.body.password,
        })
    
        const userData = await user.save();
        console.log(userData);
        res.send({status : 1})
       
    }) 

})

userRoute.post('/login', (req, res) => {
    const email = req.body.email;
    User.findOne({email}, (err,data) => {
        if (err){console.log(err)}
        if (data){
            if (data.password === req.body.password){
                console.log(data);
                session=req.session;
                session.userid=req.body.email;
                console.log(req.session);
                return res.send({status : 1})
            }
        }
        else{
            console.log(data);
            return res.send({status : 0})
        }
    } )
})




module.exports = userRoute;