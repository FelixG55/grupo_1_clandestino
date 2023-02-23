const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');
let productsFilePath = path.join(__dirname, '../database/productos.json');
let productsCartFilePath = path.join(__dirname, '../database/productsCart.json');

const allProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products/products'),{style: "styles-productDetail"})
};

const postProducts = (req, res) =>{};

const createProducts = (req, res) =>{
    res.render(path.join(__dirname, '../views/products/createProduct'),{style: "styles-createProduct"});
};

const getOneProduct = (req, res) =>{
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/products/productIdDetail'),{product ,style: "styles-productIdDetail"});

};

const formProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const {id} = req.params;
    const product = products.find(elem => elem.id == id);
    res.render(path.join(__dirname, '../views/products/productEdit'),{product: product, style: "styles-productEdit"});

};

const editProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/productos.json');
    console.log(req.body);
    products.forEach(elem => {
        if(elem.id == req.body.id){
            elem.productName = req.body.productName;
            elem.description = req.body.description;
            elem.price = req.body.price;
            elem.category = req.body.category;
        }
    });
    let data = JSON.stringify(products);
    fs.writeFile(rutaJson, data, err => {
        if (err) {
            console.error(err);
        } else{
            res.render(path.join(__dirname,'../views/products/productsDelivery'),{productsCart: productsCart, products: products, style: "styles-productCart"});
        }
    } );
};

const deleteProducts = (req, res) =>{};

const delivery = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));
    res.render(path.join(__dirname, '../views/products/productsDelivery'),{productsCart: productsCart, products: products, style: "styles-productCart"})
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