const express = require('express')
const userRoute = express()
const userController = require('./../controllers/user')

//Get all
userRoute.get('/user/getlist', (req, res) => {
    return userController.get(req, res)
})

// Get by id
userRoute.get('/user/:id', async (req, res) => {
    return userController.getById(req, res)
});

// Create
userRoute.post('/user/create', async (req, res) => {
    return userController.post(req, res)
});

// Delete
userRoute.delete('/user/:id', async (req, res) => {
    return userController.deleteById(req, res)
});

// Update
userRoute.put('/user/update', async (req, res) => {
    return userController.update(req, res)
});

module.exports = userRoute