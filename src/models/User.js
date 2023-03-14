// 1. Guardar proucto en DB
// 2. Buscar un producto por ID
// 3. Editar un producto
// 4. Eliminar un producto 

const fs = require('fs');
const path = require('path');
const { fields } = require('../middleware/multerUsersMiddelware');

const User = {

    fileName: path.join(__dirname, '../database/users.json'),

    getData: function () {
        
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));  
    },

    generateId: function (){

        let allUsers = this.findAll();
        newId = allUsers[allUsers.length - 1 ].id + 1;
        return newId;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFind = allUsers.find(oneUser => oneUser.id == id)
        return userFind;
    },

    findByField: function(field,text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData){
        let allUsers = this.findAll();
        let newuser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newuser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;

    },

    update: function (userData) {
        let allUsers = this.findAll();

        allUsers.forEach(elem => {
            if(elem.id == userData.id){
                elem.productName = userData.productName;
                elem.description = userData.description;
                elem.price = userData.price;
                elem.category = userData.category;
            }
            fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
            return true;
        });
    },

    delete: function (id){
        let allUsers = this.findAll();
        let newUser = allUsers.filter(oneUser => oneUser.id != id);
        fs.writeFileSync(this.fileName, JSON.stringify(newUser, null, ' '));
        return true;
    }


}

module.exports = User;