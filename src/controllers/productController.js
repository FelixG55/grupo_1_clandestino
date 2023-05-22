const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');
<<<<<<< HEAD
const productsFilePath = path.join(__dirname, '../database/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
=======
const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult}= require('express-validator');
const { DataTypes } = require('sequelize');
>>>>>>> b672525688f3f51be07c63eab5c726e3cb912e07

let productsFilePath = path.join(__dirname, '../database/productos.json');
let productsCartFilePath = path.join(__dirname, '../database/productsCart.json');

// Renderiza la vista de Menu 
const allProducts = (req, res) =>{
    let profile = req.session.userLogged;
    res.render(path.join(__dirname, '../views/products/products'),{profile: profile,style: "styles-productDetail"})
};

// Renderiza el formulario de creación de productos
const createProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products/createProduct'),{style: "styles-createProduct"});
};

// Crea un producto a partir del formulario de creación de productos
const postProducts = (req, res) =>{
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/products/createProduct'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-createProduct"
        });
    }else{
        db.Category.findAll({
            where: {
                name: req.body.category
            }
        }).then(category => {
            db.Product.create({
                name: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                categories_id: category[0].id,
                image: req.file ? req.file.filename: '',
            })
            .then(category => {
                return res.redirect('/productDelivery');
            });
        });
    }
};

// Renderiza la vista de detalle de un producto
const getOneProduct = (req, res) =>{
    let profile = req.session.userLogged;
    const {id} = req.params;
    db.Product.findByPk(id)
    .then(product => {
        res.render(path.join(__dirname, '../views/products/productIdDetail'), {product,profile,style: "styles-productIdDetail"});
    });
};

// Renderiza el formulario de edición de un producto
const formProduct = (req, res) => {
    const {id} = req.params;
    db.Product.findByPk(id,{
        include: [{association: "categories"}]
    })
    .then(product => {
        console.log(product);
        res.render(path.join(__dirname, '../views/products/productEdit'),{product, style: "styles-productEdit"});
    });

};

// Edita un producto a partir del formulario de edición
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
        db.Category.findAll({
            where: {
                name: req.body.category
            }
        }).then(category => {
            db.Product.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    image: req.file ? req.file.filename: '',
                    delivery: req.body.delivery,
                    categories_id: category[0].id 
                },
                {
                    where: {id: req.body.id}
                })
            return res.redirect('/productDelivery');
        })
    }
}
const deleteProducts = (req, res) =>{
    
    db.Product.destroy({
        where: {id: req.params.id}
    })
    return res.redirect('/productDelivery');

};

// Remderiza la vista de delivery de productos
const delivery = (req, res) => {
    let profile = req.session.userLogged;
    db.Product.findAll({
        include: [{association: "categories"}]
    })
    .then(products => {
        db.DetailSale.findAll({
            attributes: ['product_id',[sequelize.fn('COUNT',sequelize.col('product_id')),'total_p']],
            group: ['product_id']
        }).then(detailSale =>{
            res.render(path.join(__dirname, '../views/products/productsDelivery'), {products,profile,detailSale,style:"styles-productCart"})
            })
    })
};

//Carrito de compras//

const addProductCart = (req, res) => {
        let userid = null;
        let profile = req.session.userLogged;
        if (profile) {
            userid = profile.id
        }
        db.Sale.create(
        {
            user_id: userid,
            date: Date()
        }).then(sale =>{
            db.DetailSale.create(
                {
                   sale_id: sale.id, 
                   product_id: req.params.id
                }
            ).then(detailSale => {
                res.redirect('/productDelivery');
        })
        })
    };

const deleteProductCart = (req,res) =>  {

    db.DetailSale.destroy({
        where: {product_id: req.params.id}
    }).then(deleteProduct =>{
        console.log(req.params.id);
        res.redirect('/productDelivery');
    })
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

    let userid = null;
        let profile = req.session.userLogged;
        if (profile) {
            userid = profile.id
        }
        db.Sale.create(
        {
            user_id: userid,
            date: Date()
        }).then(sale =>{
            db.DetailSale.create(
                {
                   sale_id: sale.id, 
                   product_id: req.params.id
                }
            ).then(detailSale => {
                res.redirect('/productDelivery');
        })
        })
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