const express = require('express');
const userRoute = express.Router();
const User = require('../DB/UserDB')
const CartDB = require('../DB/CartDB')

userRoute.get('/', (req,res)=>{
    session=req.session;
    if (session.userid){
        User.findOne({_id : session.userid}, (err,data)=>{
            if (data.userType == 0){
                return res.send({status : 1})
            }
            else if(data.userType == 1){
                return res.send({status : 2})
            }
        })
        
    }
    else {
        res.send({status : 0})
    }
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
    console.log("cookiies id",req.body.cookieId);
    const email = req.body.email;
    User.findOne({email}, (err,data) => {
        if (err){console.log(err)}
        if (data){
            if (data.password === req.body.password){
                var usertype = data.userType
                console.log(usertype);
                session = req.session;
                session.userid = data._id;
                
                if(req.body.cookieId){
                    CartDB.updateMany({userID : req.body.cookieId}, {userID : data._id}, (err, update) => {
                        if(update){
                            console.log("update", update)
                        }
                    })
                }
                

                if(usertype == 1){
                    //admin user
                    return res.send({status : 2})
                }
                //normal user
                return res.send({status : 1})
            }
        }
        else{
            console.log(data);
            return res.send({status : 0})
        }
    } )
})


userRoute.get('/logout', (req,res) => {
    req.session.destroy();
    res.send({status : 1})
})




module.exports = userRoute;