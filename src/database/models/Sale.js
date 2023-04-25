module.exports = (sequelize, dataTypes) => {
    let alias = 'Sale';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.BIGINT(10),
        },
        date: {
            type: dataTypes.DATE
        }
    };
    let config = {
        timestamps: false,
    }
    const Sale = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

    Sale.associate = function(modelos){
        Sale.belongsToMany(modelos.Product,{
            as: "products",
            through: "detail_sale", 
            foreignKey: "sale_id",
            otherKey: "product_id",
            timestamps: false,
        })
     }   
    return Sale
};