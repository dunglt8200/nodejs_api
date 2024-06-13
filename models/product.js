const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    Code: String,
    Name: String,
    Img: String,
    Price: String,
}, { collection: 'Product', versionKey: false });

const Product = mongoose.model('Product', userSchema);

module.exports = Product;