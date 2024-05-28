const express = require('express')
const userRoute = express()
const productController = require('../controllers/product')
const controller = 'product'
//Get all
userRoute.get(`/${controller}/getlist`, (req, res) => {
    return productController.get(req, res)
})

// Get by id
userRoute.get(`/${controller}/:id`, async (req, res) => {
    return productController.getById(req, res)
});

// Create
userRoute.post(`/${controller}/create`, async (req, res) => {
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

module.exports = userRoute