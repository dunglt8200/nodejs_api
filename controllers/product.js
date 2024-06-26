const Product = require('../models/product');
const ProductType = require('../models/product_type');
const Utils = require('../utils/util');

const get = async (req, res) => {
    try {
        const products = await Product.find();
        const productTypes = await ProductType.find();

        products.map(product => {
            if (product.Img) {
                product.Img = Utils.convertFilePathToURL(product.Img)
            } else {
                product.Img = 'default_image_url.jpg';
            }});

        const productReponses = products.map(product => ({
            ...product.toObject(),
            ProductTypeName: productTypes.find(x => x.Code == product.ProductType)?.Name
        }));

        res.status(200).send(productReponses);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const post = async (req, res) => {
    try {
        const Img = req.file ? req.file.path : '';
        const product = new Product(req.body);
        product.Code = `SP_${Utils.generateRandomNumber()}`;
        product.Img = Img;
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
        const Img = req.file ? req.file.path : '';
        req.body.Img = Img;
        const product = await Product.findByIdAndUpdate(req.body.Id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteByIds = async (req, res) => {
    try {
        const product = await Product.deleteMany({ _id: { $in:  req.body.ids} });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    get,
    post,
    getById,
    deleteById,
    update,
    deleteByIds
}