const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: String,
    Password: String  
}, { collection: 'User', versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;