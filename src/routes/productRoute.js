const express= require('express');

const {products, postProducts,createProducts,getIdProducts,putProducts,productsDetail} = require ('../controllers/productController');
const routerProduct = express.Router();

routerProduct.get('/products', products);
routerProduct.post('/products', postProducts);
routerProduct.get('/products/create', createProducts);
routerProduct.get('/products/:id', getIdProducts);
routerProduct.put('/products/:id', putProducts);
routerProduct.delete('/products/:id', putProducts);
routerProduct.get('/products/:id/edit', productsDetail);

// routerProduct.get('/productCart', productCart);
// routerProduct.get('/productDetail', productDetail);
// routerProduct.get('/productEdit', productEdit)

module.exports = routerProduct;