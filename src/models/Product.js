// 1. Guardar proucto en DB
// 2. Buscar un producto por ID
// 3. Editar un producto
// 4. Eliminar un producto 

const fs = require('fs');

const Product = {

    fileName: '../database/productos',

    getData: function () {
        
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));  
    },

    generateId: function (){

        let allProducts = this.findAll();
        newId = allProducts[allProducts.length - 1 ].id + 1;
        return newId;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allProducts = this.findAll();
        let productFind = allProducts.find(oneProduct => oneProduct.id == id)
        return productFind;
    },

    create: function (productData){
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return true;

    },

    update: function (productData) {
        let allProducts = this.findAll();

        allProducts.forEach(elem => {
            if(elem.id == productData.id){
                elem.productName = productData.productName;
                elem.description = productData.description;
                elem.price = productData.price;
                elem.category = productData.category;
            }
            fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
            return true;
        });


    },

    delete: function (id){
        let allProducts = this.findAll();
        let newProducts = allProucts.filter(oneUser => oneUser.id != id);
        fs.writeFileSync(this.fileName, JSON.stringify(newProducts, null, ' '));
        return true;
    }


}

module.exports = Product;