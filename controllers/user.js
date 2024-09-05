const User = require('../models/user');
const Utils = require('../utils/util');
const bcrypt = require('bcryptjs');

const insert = async (req, res) => {
    try {
        const user = new User(req.body);
        user.Password = await Utils.hashPassword(user.Password);
        await user.save();
        res.status(200).send(user.UserName);
    } catch (error) {
        res.status(500).send(error);
    }
}

const get = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteByIds = async (req, res) => {
    try {
        const user = await User.deleteMany({ _id: { $in:  req.body.ids} });
        if (!user) {
            return res.status(404);
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
}

const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.Id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404);
        }
        res.status(200).send(user.UserName);
    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        // Find the user by username
        const user = await User.findOne({ UserName });

        if (!user) {
            // User not found
            return res.status(200).send(false);
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (isMatch) {
            // Password matches
            res.status(200).send(true);
        } else {
            // Password does not match
            res.status(200).send(false);
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(200).send(false);
    }
}

module.exports = {
    insert,
    get,
    getById,
    deleteByIds,
    update,
    login
}