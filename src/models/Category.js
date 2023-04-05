module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoary';
    let cols = {
        idcategory: {
            type: dataTypes.INT(11),
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        category_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
 
    return Category
};