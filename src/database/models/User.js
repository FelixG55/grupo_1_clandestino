module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        admin:{
            type: dataTypes.BIGINT(1),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(45)
        }
    };
    let config = {
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

    User.associate = function(modelos){
        User.hasMany(modelos.Sale,{
            as: "sales",
            foreignKey: "user_id"
        })
        User.belongsToMany(modelos.Product,{
            as: "products",
            through: "productscart", 
            foreignKey: "users_id",
            otherKey: "products_id",
            timestamps: false,
        })
     }   
 
    return User;
};