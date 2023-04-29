const path = require("path")
const DB = require("../../database/models")
const sequelize = require("sequelize")
const products = (req, res)=>{
DB.Product.findAll()
    .then( (product)=>{

        const countProducts = product.length
        const products = product.map(product=> {
            return{
                id: product.id,
                name: product.name,
                description: product.description,
                relation: "nose todavia",
                image: "/api/products/" + product.id
            }})
        const category = product.map(product=> {
            return {categories: product.categories_id }
        } )
     res.json({
        countProducts,
        products,    
        category,
      

     })
    })
}
const product = (req, res)=> {
    DB.Product.findByPk(req.params.id)
    .then( (product)=>{
     res.json(product)
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
      
      
        // const categories =   
        //  DB.Category.findAll()
        //  .then(name => {res.json(name)})



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