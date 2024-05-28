const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Id: ObjectId,
    Name: String,
    Img: String,
    Price: String,
    Code: String,
}, { collection: 'Product', versionKey: false });

const Product = mongoose.model('Product', userSchema);

module.exports = Product;