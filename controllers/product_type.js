const ProductType = require('../models/product_type');
const Utils = require('../utils/util');

const insert = async (req, res) => {
    try {
        const product_type = new ProductType(req.body);
        product_type.Code = `TSP_${Utils.generateRandomNumber()}`;
        await product_type.save();
        res.status(200).send(product_type);
    } catch (error) {
        res.status(400).send(error);
    }
}

const get = async (req, res) => {
    try {
        const productTypes = await ProductType.find();
        res.status(200).send(productTypes);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        if (!productType) {
            return res.status(404).send();
        }
        res.status(200).send(productType);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteByIds = async (req, res) => {
    try {
        const productType = await ProductType.deleteMany({ _id: { $in:  req.body.ids} });
        if (!productType) {
            return res.status(404).send();
        }
        res.status(200).send(productType);
    } catch (error) {
        res.status(500).send(error);
    }
}

const update = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndUpdate(req.body.Id, req.body, { new: true, runValidators: true });
        if (!productType) {
            return res.status(404).send();
        }
        res.status(200).send(productType);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    insert,
    get,
    getById,
    deleteByIds,
    update
}