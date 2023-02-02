const express= require('express');

const {productCart, productDetail, productEdit} = require ('../controllers/productController');
const routerProduct = express.Router();

routerProduct.get ('/productCart', productCart);
routerProduct.get ('/productDetail', productDetail);
routerProduct.get ('/productEdit', productEdit)

module.exports = routerProduct;