
const path = require('path');

const productCart= (req, res) => {
    res.render(path.join(__dirname, '../views/productCart'),{style: "styles-productCart"});
};



const productEdit = (req, res) => {
    res.render(path.join(__dirname, '../views/productEdit'),{style: "styles-productEdit"});
};
const products = (req, res) =>{};

const postProducts = (req, res) =>{};

const createProducts = (req, res) =>{};

const getIdProducts = (req, res) =>{};

const putProducts = (req, res) =>{};

const productsDetail = (req, res) =>{
    res.render(path.join(__dirname, '../views/productDetail'),{style: "styles-productDetail"});
};

 
module.exports = {
    productCart,
    productEdit,
    products, 
    postProducts,
    createProducts,
    getIdProducts,
    putProducts,
    productsDetail 
};