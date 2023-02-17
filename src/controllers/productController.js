const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




const allProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products'),{style: "styles-productDetail"})
};

const postProducts = (req, res) =>{};

const createProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/createProduct'),{style: "styles-createProduct"});
};

const getOneProduct = (req, res) =>{
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/productIdDetail'),{product ,style: "styles-productIdDetail"});

};

const formProduct = (req, res) => {
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/productEdit'),{product, style: "styles-productEdit"});

};

const editProduct = (req, res) => {
    // res.render(path.join(__dirname, '../views/productEdit'),{style: "styles-productEdit"});
};

const deleteProducts = (req, res) =>{};

const delivery = (req, res) => {
    res.render  (path.join(__dirname, '../views/productsDelivery'),{products: products, style: "styles-productCart"})
};


module.exports = {
    // productCart,
    // productEdit,
    // productDetail, 
    allProducts, 
    postProducts,
    createProducts,
    getOneProduct,
    formProduct,
    editProduct,
    deleteProducts,
    delivery
   
};