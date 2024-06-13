const express = require('express');
const productTypeRoute = express();
const productTypeController = require('../controllers/product_type');
const controller = 'product_type';

// Create
productTypeRoute.post(`/${controller}/create`, async (req, res) => {
    return productTypeController.insert(req, res)
});

productTypeRoute.get(`/${controller}/getlist`, (req, res) => {
    return productTypeController.get(req, res)
})

// Get by id
productTypeRoute.get(`/${controller}/:id`, async (req, res) => {
    return productTypeController.getById(req, res)
});

// Update
productTypeRoute.put(`/${controller}/update`, async (req, res) => {
    return productTypeController.update(req, res)
});

// Delete ids
productTypeRoute.post(`/${controller}/deleteIds`, async (req, res) => {
    return productTypeController.deleteByIds(req, res)
});

module.exports = productTypeRoute