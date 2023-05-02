const { Sequelize } = require(".");

module.exports= (sequelize, DataTypes)=>{
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            auto_increment: true,
        },
        name:{
            type: DataTypes.STRING,
            not_null: true
         },
        description:{
            type: DataTypes.STRING,
            not_null: true
         },
         image:{
            type: DataTypes.STRING,
            not_null: true
         },
         categories_id: {
            type: DataTypes.INTEGER
         }
         },{
            tableName: "products",
            timestamps: false
         })
         Product.associate= function(modelos){
            Product.belongsTo(modelos.Category, {
               as: "categories",
               foreignKey: "categories_id"
            })
         }
         return Product
}