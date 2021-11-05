const express = require('express');
const AnnonimusUser = require('../DB/AnnonimusUserDB');
let anUserRoute = express.Router();


anUserRoute.post('/store', async (req,res) => {
    const anuser = new AnnonimusUser({
        name : req.body.name
    })
    const data = await anuser.save();
    res.send(data._id);
})

module.exports = anUserRoute;