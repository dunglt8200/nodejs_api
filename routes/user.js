const express = require('express');
const userRoute = express();
const userController = require('../controllers/user');
const controller = 'user';

// Create
userRoute.post(`/${controller}/create`, async (req, res) => {
    return userController.insert(req, res)
});

userRoute.get(`/${controller}/getlist`, (req, res) => {
    return userController.get(req, res)
})

// Get by id
userRoute.get(`/${controller}/:id`, async (req, res) => {
    return userController.getById(req, res)
});

// Update
userRoute.put(`/${controller}/update`, async (req, res) => {
    return userController.update(req, res)
});

// Delete ids
userRoute.post(`/${controller}/deleteIds`, async (req, res) => {
    return userController.deleteByIds(req, res)
});

// Login
userRoute.post(`/${controller}/login`, async (req, res) => {
    return userController.login(req, res)
});

module.exports = userRoute