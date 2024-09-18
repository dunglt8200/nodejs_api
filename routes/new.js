const express = require('express');
const newRoute = express();
const newController = require('../controllers/new');
const controller = 'new';
const upload = require('../utils/upload');

//Get all
newRoute.get(`/${controller}/getlist`, (req, res) => {
    return newController.get(req, res)
})

// Get by id
newRoute.get(`/${controller}/:id`, async (req, res) => {
    return newController.getById(req, res)
});

// Create
newRoute.post(`/${controller}/create`,upload.single('Img'), async (req, res) => {
    return newController.post(req, res)
});

// Delete
newRoute.delete(`/${controller}/:id`, async (req, res) => {
    return newController.deleteById(req, res)
});

// Update
newRoute.put(`/${controller}/update`, upload.single('Img'), async (req, res) => {
    return newController.update(req, res)
});

// Delete ids
newRoute.post(`/${controller}/deleteIds`, async (req, res) => {
    return newController.deleteByIds(req, res)
});

module.exports = newRoute