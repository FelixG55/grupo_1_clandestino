const express= require('express');

const {productCart, productDetail} = require ('../controllers/productController');
const routerProduct = express.Router();

routerProduct.get ('/productCart', productCart);
routerProduct.get ('/productDetail', productDetail);

module.export = routerProduct;