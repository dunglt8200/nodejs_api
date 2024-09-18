const { now } = require('mongoose');
const New = require('../models/new');
const Utils = require('../utils/util');

const get = async (req, res) => {
    try {
        const news = await New.find();

        news.map(item => {
            if (item.Img) {
                item.Img = Utils.convertFilePathToURL(item.Img)
            } else {
                item.Img = 'default_image_url.jpg';
            }});
        res.status(200).send(news);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getById = async (req, res) => {
    try {
        const resNew = await New.findById(req.params.id);
        if (!resNew) {
            return res.status(404).send();
        }
        res.status(200).send(resNew);
    } catch (error) {
        res.status(500).send(error);
    }
}

const post = async (req, res) => {
    try {
        const Img = req.file ? req.file.path : '';
        const resNew = new New(req.body);
        resNew.Img = Img;
        resNew.DateCreate = new Date();
        await resNew.save();
        res.status(200).send(resNew);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const resNew = await New.findByIdAndDelete(req.params.id);
        if (!resNew) {
            return res.status(404).send();
        }
        res.status(200).send(resNew);
    } catch (error) {
        res.status(500).send(error);
    }
}

const update = async (req, res) => {
    try {
        const oldNew = await New.findById(req.body.Id);
        if (!oldNew) {
            return res.status(404).send();
        }
        const Img = req.file ? req.file.path : oldNew.Img;
        req.body.Img = Img;
        req.body.DateCreate = oldNew.DateCreate;
        const resNew = await New.findByIdAndUpdate(req.body.Id, req.body, { new: true, runValidators: true });
        if (!resNew) {
            return res.status(404).send();
        }
        res.status(200).send(resNew);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteByIds = async (req, res) => {
    try {
        const resNew = await New.deleteMany({ _id: { $in:  req.body.ids} });
        if (!resNew) {
            return res.status(404).send();
        }
        res.status(200).send(resNew);
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