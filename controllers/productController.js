
const path = require('path');

const productCart= (req, res) => {
    res.render(path.join(__dirname, './views/productCart'));
};

const productDetail = (req, res) => {
    res.render(path.join(__dirname, './views/productDetail'));
};

module.exports = {
    productCart,
    productDetail
};