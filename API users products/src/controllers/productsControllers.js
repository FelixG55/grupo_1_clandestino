const path = require("path")
const DB = require("../../database/models")
const sequelize = require("sequelize")

const products = (req, res)=>{

       
        DB.Product.findAll( { 
        include: [{association: "categories"}]
         })
        .then(product => {
            const countProducts = product.length
            const products = product.map(product=> {
                return{
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.categories,
                    detail: `http://localhost:3022/api/products/${product.id}`
                }})
        DB.Product.findAll({
            attributes: ['categories_id',[sequelize.fn('COUNT',sequelize.col('categories_id')),'total']],
            group: ['categories_id']
        })
        .then(productsByCategory=>{
            console.log(productsByCategory);
         DB.Category.findAll()
            .then(categories => {
                let totalCategories = []
                for (let i = 0; i < productsByCategory.length; i++) {
                    for (let j = 0; j < categories.length; j++) {
                       if (productsByCategory[i].categories_id == categories[j].id) {
                            totalCategories.push({
                                category: categories[j].name,
                                total: productsByCategory[i].get().total
                            })
                       } 
                    }
                }
                return totalCategories
            }).then(countByCategory =>{
                res.json({countProducts,countByCategory,products})
            })
        })
    })
}



const product = (req, res)=> {
    DB.Product.findByPk(req.params.id,{        include: [{association: "categories"}]} )
    .then( (product)=>{
     res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.categories.name,
        image: `http://localhost:3022/api/products/${`../../../public/images/delivery-products/${product.image}`}`,
      })
    })
}
const categori = (req, res)=> {
    const resultado = DB.Product.findAll( { include: [{association: "categories"}]})
    .then(products => {
        DB.Product.findAll({
            attributes: ['categories_id',[sequelize.fn('COUNT',sequelize.col('categories_id')),'total_catgories']],
            group: ['categories_id']
        })})
        // .then(name => {res.json(name)})
        .then( (product)=>{res.json(product)})
        .then(
            (categories )=>{
                DB.Category.findAll()})
                .then(name => {res.json(name)})}
      
      



    //   const arreglo = [{
    //     resultado,
    //     categories
    //   }]
    //   res.json(arreglo)

      



// db.Product.findAll({
//     include: [{association: "categories"}]
// })
// .then(products => {
//     db.DetailSale.findAll({
//         attributes: ['product_id',[sequelize.fn('COUNT',sequelize.col('product_id')),'total_p']],
//         group: ['product_id']
//     }).then(detailSale =>{
//         res.render(path.join(__dirname, '../views/products/productsDelivery'), {products,profile,detailSale,style:"styles-productCart"})
//         })
// })


// const delivery = (req, res) => {
//     let profile = req.session.userLogged;
//     db.Product.findAll({
//         include: [{association: "categories"}]
//     })
//     .then(products => {
//         db.DetailSale.findAll({
//             attributes: ['product_id',[sequelize.fn('COUNT',sequelize.col('product_id')),'total_p']],
//             group: ['product_id']
//         }).then(detailSale =>{
//             res.render(path.join(__dirname, '../views/products/productsDelivery'), {products,profile,detailSale,style:"styles-productCart"})
//             })
//     })
// };

module.exports = {
    products,
    product,
    categori

}