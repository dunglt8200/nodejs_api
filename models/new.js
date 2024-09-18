const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    Title: String,
    Img: String,
    Content: String,
    IsShow: Boolean,
    DateCreate: Date  
}, { collection: 'New', versionKey: false });

const New = mongoose.model('New', newSchema);

module.exports = New;