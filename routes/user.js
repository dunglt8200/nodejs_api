const express = require('express')
const userRoute = express()
const userController = require('./../controllers/user')

userRoute.get('/user', (req, res) => {
    return userController.get(req, res)

})

module.exports = userRoute