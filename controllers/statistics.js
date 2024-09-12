const ThongKeViewModel = require('../viewmodels/thongKeViewModel');
const Product = require('../models/product');
const ProductType = require('../models/product_type');

const thongKeLoaiSanPham = async (req, res) => {
    try {
        const product_types = await ProductType.find();
        const thongKeResults = [];
        for (const type of product_types) {
            const productCount = await Product.countDocuments({ ProductType: type.Code });
            const thongKe = new ThongKeViewModel(type.id, type.Name, productCount);
            thongKeResults.push(thongKe.toResponse());
        }
        res.status(200).send(thongKeResults);
    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    thongKeLoaiSanPham
}