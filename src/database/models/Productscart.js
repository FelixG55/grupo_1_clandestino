module.exports = (sequelize, dataTypes) => {
    let alias = 'Productscart';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        products_id: {
            type: dataTypes.BIGINT(11),
            allowNull: false
        },
        users_id: {
            type: dataTypes.BIGINT(11),
            allowNull: true
        }
    };
    
    let config = {
        tableName: "productscart",
        timestamps: false
    }
    const Productscart = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
 
    return Productscart
};