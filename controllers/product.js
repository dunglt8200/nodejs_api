const Product = require('../models/product');
const Utils = require('../utils/util');

const get = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const post = async (req, res) => {
    try {
        const product = new Product(req.body);
        product.Code = `SP_${Utils.generateRandomNumber()}`;
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    get,
    post,
    getById,
    deleteById,
    update
}