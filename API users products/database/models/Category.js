
module.exports = (sequelize, DataTypes) =>{
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            auto_increment: true,
        },
        name:{
            type: DataTypes.STRING,
            not_null: true

         }},{
            tableName: "categories",
            timestamps: false
         })
         Category.associate= function(modelos){
            Category.hasMany(modelos.Product, {
               as: "products",
               foreignKey: "categories_id"
            })
         }
         return Category
}