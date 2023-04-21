module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        image:{
           type: dataTypes.STRING(250)
        },
        delivery:{
            type: dataTypes.BIGINT(1),
            // allowNull: false
        },
        video:{
            type: dataTypes.STRING(250)
        },
        categories_id:{
            type: dataTypes.BIGINT(11),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const Product = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Product)
     Product.associate = function(modelos){
        Product.belongsTo(modelos.Category,{
            as: "categories",
            foreignKey: "categories_id"
        })
        Product.belongsToMany(modelos.User,{
            as: "users",
            through: "productscart", 
            foreignKey: "products_id",
            otherKey: "users_id",
            timestamps: false,
        })
        Product.belongsToMany(modelos.Sale,{
            as: "sales",
            through: "detail_sale", 
            foreignKey: "product_id",
            otherKey: "id",
            timestamps: false,
        })
     }   

    return Product
};