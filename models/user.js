const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Id: ObjectId,
    Name: String,
    Email: String
}, { collection: 'User', versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;