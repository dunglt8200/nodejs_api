const express = require('express');
const userRoute = express();
const productController = require('../controllers/product');
const controller = 'product';
const upload = require('../utils/upload');

//Get all
userRoute.get(`/${controller}/getlist`, (req, res) => {
    return productController.get(req, res)
})

// Get by id
userRoute.get(`/${controller}/:id`, async (req, res) => {
    return productController.getById(req, res)
});

// Create
userRoute.post(`/${controller}/create`,upload.single('Img'), async (req, res) => {
    return productController.post(req, res)
});

// Delete
userRoute.delete(`/${controller}/:id`, async (req, res) => {
    return productController.deleteById(req, res)
});

// Update
userRoute.put(`/${controller}/update`, async (req, res) => {
    return productController.update(req, res)
});

// Delete ids
userRoute.post(`/${controller}/deleteIds`, async (req, res) => {
    return productController.deleteByIds(req, res)
});

module.exports = userRoute