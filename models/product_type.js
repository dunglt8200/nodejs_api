const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTypeSchema = new mongoose.Schema({
    Code: String,
    Name: String,    
}, { collection: 'ProductType', versionKey: false });

const ProductType = mongoose.model('ProductType', productTypeSchema);

module.exports = ProductType;