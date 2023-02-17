const express= require('express');

const {allProducts, postProducts,createProducts,getOneProduct,formProduct, editProduct,deleteProducts, delivery, addProductCart, deleteProductCart, restProductCart ,sumProductCart} = require ('../controllers/productController');
const routerProduct = express.Router();

routerProduct.get('/products', allProducts);
routerProduct.post('/products', postProducts);
routerProduct.get('/products/create', createProducts);
routerProduct.get('/products/:id', getOneProduct);
routerProduct.get('/products/:id/edit',formProduct);
routerProduct.put('/products/:id', editProduct);
routerProduct.delete('/products/:id', deleteProducts);

routerProduct.get('/productDelivery', delivery);
routerProduct.get('/products/addProductCart/:id', addProductCart);
routerProduct.get('/products/deleteProductCart/:id', deleteProductCart);
routerProduct.get('/products/restProductCart/:id', restProductCart);
routerProduct.get('/products/sumProductCart/:id', sumProductCart);

// routerProduct.get('/productCart', productCart);
// routerProduct.get('/productDetail', productDetail);
// routerProduct.get('/productEdit', productEdit)

module.exports = routerProduct;