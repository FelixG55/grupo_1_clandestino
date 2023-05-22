module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

    Category.associate = function(modelos){
        Category.hasMany(modelos.Product,{

            as: "products",
            foreignKey: "categories_id"
        })
     }   
 
    return Category
};