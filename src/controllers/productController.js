const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product')
const {validationResult}= require('express-validator');

let productsFilePath = path.join(__dirname, '../database/productos.json');
let productsCartFilePath = path.join(__dirname, '../database/productsCart.json');

const allProducts = (req, res) =>{
    console.log(req.session.userLogged);
    let profile = req.session.userLogged;
    res.render(path.join(__dirname, '../views/products/products'),{profile: profile,style: "styles-productDetail"})
};

const postProducts = (req, res) =>{
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/products/createProduct'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-createProduct"
        });
    }else{
        let productToCreate = {
            ...req.body,
            image: req.file ? req.file.filename: ''
        }
        Product.create(productToCreate)
        return res.redirect('/productDelivery');
    }
};

const createProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products/createProduct'),{style: "styles-createProduct"});
};

const getOneProduct = (req, res) =>{
    let profile = req.session.userLogged;
    const {id} = req.params;
    const product = Product.findByPk(id);
    res.render(path.join(__dirname, '../views/products/productIdDetail'),{profile:profile, product ,style: "styles-productIdDetail"});

};

const formProduct = (req, res) => {
    const {id} = req.params;
    const product = Product.findByPk(id)
    res.render(path.join(__dirname, '../views/products/productEdit'),{product: product, style: "styles-productEdit"});

};

const editProduct = (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/products/productEdit'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-createProduct",
            product: req.body
        });
    }else{
        let productToUpdate = {
            ...req.body,
            image: req.file ? req.file.filename: ''
        }
        Product.update(productToUpdate)
        return res.redirect('/productDelivery');
    
    }
}
const deleteProducts = (req, res) =>{
    
    Product.delete(req.params.id)
    return res.redirect('/productDelivery');

};

const delivery = (req, res) => {
    let profile = req.session.userLogged;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    res.render(path.join(__dirname, '../views/products/productsDelivery'),{profile: profile,productsCart: productsCart, products: products, style: "styles-productCart"})
};

const addProductCart = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/productsCart.json');

        const {id} = req.params;
        if (productsCart.find(elem => elem.id == id) == undefined) {
            const product = products.find(elem => elem.id == id);
            const productCart = {
                id: product.id,
                productName: product.productName,
                price: product.price,
                image: product.image,
                quantity:  1
            }
            productsCart.push(productCart);
            let data = JSON.stringify(productsCart);
            fs.writeFile(rutaJson, data, err => {
                if (err) {
                    console.error(err);
                } else{
                    res.redirect('/productDelivery');
                }
            } );
        }else{
            const productCart = productsCart.find(elem => elem.id == id);
            productCart.quantity = productCart.quantity + 1;
            let data = JSON.stringify(productsCart);
            fs.writeFile(rutaJson, data, err => {
                if (err) {
                    console.error(err);
                } else{
                    res.redirect('/productDelivery');
                }
            } );
        }  
    };

const deleteProductCart = (req,res) =>  {

    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/productsCart.json');
    const {id} = req.params;
    const newProductsCart = productsCart.filter(elem => elem.id != id);
    let data = JSON.stringify(newProductsCart);
        fs.writeFile(rutaJson, data, err => {
			if (err) {
				console.error(err);
			} else{
                res.redirect('/productDelivery');
			}
		} );
}

const restProductCart = (req,res) =>{

    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/productsCart.json');

        const {id} = req.params;
        const productCart = productsCart.find(elem => elem.id == id);
            productCart.quantity = productCart.quantity - 1;
            let data = JSON.stringify(productsCart);
            fs.writeFile(rutaJson, data, err => {
                if (err) {
                    console.error(err);
                } else{
                    res.redirect('/productDelivery');
                }
            } );

}
const sumProductCart = (req,res) =>{

    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));

    rutaJson = path.join(__dirname,'../database/productsCart.json');

        const {id} = req.params;
        const productCart = productsCart.find(elem => elem.id == id);
            productCart.quantity = productCart.quantity + 1;
            let data = JSON.stringify(productsCart);
            fs.writeFile(rutaJson, data, err => {
                if (err) {
                    console.error(err);
                } else{
                    res.redirect('/productDelivery');
                }
            } );
    
}
module.exports = {
    
    allProducts, 
    postProducts,
    createProducts,
    getOneProduct,
    formProduct,
    editProduct,
    deleteProducts,
    delivery,
    addProductCart,
    deleteProductCart,
    restProductCart,
    sumProductCart
   
};