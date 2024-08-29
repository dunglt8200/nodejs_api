const express = require('express');
const userRoute = express();
const controller = 'status';
//Get all
userRoute.get(`/${controller}/checkstatusApi`, (req, res) => {
    res.send("ok")
})

module.exports = userRoute