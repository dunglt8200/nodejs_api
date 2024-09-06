const User = require('../models/user');
const Utils = require('../utils/util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const user = await User.findOne({ UserName });

        if (!user) {
            return res.status(200).send({isCheckLogin: false});
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (isMatch) {
            const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
            const refreshtoken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });       
            return res.status(200).send({isCheckLogin: true, token: token, refreshtoken: refreshtoken});
        } else {
            return res.status(200).send({isCheckLogin: false});
        }
    } catch (error) {
        return res.status(200).send({isCheckLogin: false});
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshtoken;
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });
            const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        return res.status(403).json(error);
    }
}

module.exports = {
    insert,
    get,
    getById,
    deleteByIds,
    update,
    login,
    refreshToken
}