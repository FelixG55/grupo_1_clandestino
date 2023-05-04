const path = require("path")
const DB = require("../../database/models")
const sequelize = require("sequelize")
const db = require("../../database/models")



const products = (req, res) => {
    DB.Product.findAll(
        {include: [{association: "categories"}]}
    ).then((product) => {
      const countProducts = product.length;
      const products = product.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.categories.name,
          detail: `http://localhost:3022/api/products/${product.id}`,
        };
      });
     DB.Product.findAll({
          attributes: [
            "categories_id",
            [
             sequelize.fn("COUNT", sequelize.col("categories_id")),
                  "total_catgories", 
                
            ],
          ],
          group: ["categories_id"],
        }).then((categories) => {
           res.json({
          countProducts,
          categories,
          products,
          
        });
      });
    })}
  
  


const product = (req, res)=> {
    DB.Product.findByPk(req.params.id, {include: [{association: "categories"}]})
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



// const categori = (req, res)=> {
//     const resultado = DB.Product.findAll( { 
//         include: [{association: "categories"}]       
//     })
//     .then(
//         DB.Product.findAll({
//             attributes: ['categories_id',[sequelize.fn('COUNT',sequelize.col('categories_id')),'total_catgories']],
//             group: ['categories_id']
//         }))
//     .then((product)=>{res.json(product)})
//     .then(DB.Category.findAll())
//     console.log(resultado)   
// }

      



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
    // categori

}