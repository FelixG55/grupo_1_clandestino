
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
    DB.Product.findByPk(req.params.id,{
        include: [{association: "categories"}]
    })
    .then( (product)=>{
     res.json(product)
    })
}

const lastProduct = (req, res) =>{

    DB.Product.findAll({
        limit: 1,
        order: [ ['id', 'DESC' ]]
    })
    .then((lastProducts) =>{
        res.json(lastProducts);
    })
}

const detailProducts = (req ,res) =>{

    DB.Product.findAll({
        include: [{association: "categories"}]
    })
    .then((lastProducts) =>{
        res.json(lastProducts);
    })
}



module.exports = {
    products,
    product,
    lastProduct,
    detailProducts,
}