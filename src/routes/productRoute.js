const express= require('express');
const validations = require('../middleware/validateFormProduct')

const {allProducts, postProducts,createProducts,getOneProduct,formProduct,
      editProduct,deleteProducts, delivery, addProductCart,
      deleteProductCart, restProductCart ,sumProductCart, buyProducts} = require ('../controllers/productController');
const routerProduct = express.Router();
const uploadProductFile = require('../middleware/multerProductsMiddelware.js');

routerProduct.get('/products', allProducts);
routerProduct.post('/products',uploadProductFile.single('image'),validations, postProducts);

routerProduct.get('/products/create',createProducts);
routerProduct.get('/products/:id', getOneProduct);

routerProduct.get('/products/:id/edit',formProduct);
routerProduct.put('/products/:id',uploadProductFile.single('image'),validations, editProduct);
routerProduct.delete('/products/:id', deleteProducts);

routerProduct.get('/productDelivery', delivery);

// Product Cart 
routerProduct.get('/products/addProductCart/:id', addProductCart);
routerProduct.get('/products/deleteProductCart/:id', deleteProductCart);
routerProduct.get('/products/restProductCart/:id', restProductCart);
routerProduct.get('/products/sumProductCart/:id', sumProductCart);
routerProduct.get('/products/buyProducts', buyProducts)
// End Product Cart

module.exports = routerProduct;