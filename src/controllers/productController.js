const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');


const allProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products'),{style: "styles-productDetail"})
};

const postProducts = (req, res) =>{};

const createProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/createProduct'),{style: "styles-createProduct"});
};

const getOneProduct = (req, res) =>{
    const productsFilePath = path.join(__dirname, '../database/productos.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/productIdDetail'),{product ,style: "styles-productIdDetail"});

};

const formProduct = (req, res) => {
    const productsFilePath = path.join(__dirname, '../database/productos.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/productEdit'),{product, style: "styles-productEdit"});

};

const editProduct = (req, res) => {
    // res.render(path.join(__dirname, '../views/productEdit'),{style: "styles-productEdit"});
};

const deleteProducts = (req, res) =>{};

const delivery = (req, res) => {
    const productsFilePath = path.join(__dirname, '../database/productos.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCartFilePath = path.join(__dirname, '../database/productsCart.json');
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
        res.render(path.join(__dirname, '../views/productsDelivery'),{productsCart: productsCart, products: products, style: "styles-productCart"})
};

const addProductCart = (req, res) => {
    const productsFilePath = path.join(__dirname, '../database/productos.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCartFilePath = path.join(__dirname, '../database/productsCart.json');
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
    const productsCartFilePath = path.join(__dirname, '../database/productsCart.json');
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/productsCart.json');
    const {id} = req.params;
    const newProductsCart = productsCart.filter(elem => elem.id != id);
    console.log(newProductsCart);
    let data = JSON.stringify(newProductsCart);
        fs.writeFile(rutaJson, data, err => {
			if (err) {
				console.error(err);
			} else{
                res.redirect('/productDelivery');
			}
		} );

}
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
    delivery,
    addProductCart,
    deleteProductCart
   
};