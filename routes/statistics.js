const express = require('express');
const statisticsRoute = express();
const controller = 'statistics';
const statisticsController = require('../controllers/statistics');

statisticsRoute.post(`/${controller}/thongke-producttype`, async (req, res) => {
    return statisticsController.thongKeLoaiSanPham(req, res)
});

module.exports = statisticsRoute
