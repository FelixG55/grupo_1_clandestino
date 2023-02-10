const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/productos.json');
const allProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




const productCart= (req, res) => {

    req.
    res.render(path.join(__dirname, '../views/productCart'),{style: "styles-productCart"});
};

const productEdit = (req, res) => {

    res.render(path.join(__dirname, '../views/productEdit'),{style: "styles-productEdit"});
};
const products = (req, res) =>{

    res.render(path.join(__dirname, '../views/productDetail'),{style: "styles-productDetail"})
};

const postProducts = (req, res) =>{};

const createProducts = (req, res) =>{

    res.render(path.join(__dirname, '../views/createProduct'),{style: "styles-createProduct"});
};

const getProduct = (req, res) =>{
    const {id} = req.params;
    const product = allProducts.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/productIdDetail'),{product ,style: "styles-productIdDetail"});

};


const putProducts = (req, res) =>{};

const productDetail = (req, res) =>{
    res.render(path.join(__dirname, '../views/productDetail'),{style: "styles-productDetail"});
};

const editProduct = (req, res) => {

};
const delivery = (req, res) => {
    res.render  (path.join(__dirname, '../views/productCart'),{style: "styles-productCart"})
};

module.exports = {
    // productCart,
    // productEdit,
    // productDetail, 
    products, 
    postProducts,
    createProducts,
    getProduct,
    putProducts,
    editProduct,
    delivery,

   
};