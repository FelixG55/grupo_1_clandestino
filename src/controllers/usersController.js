const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult}= require('express-validator');
let usersFilePath = path.join(__dirname, '../database/users.json');

const login = (req, res) => {
    res.render(path.join(__dirname, '../views/login'),{style: "styles-login"});
};

const reservation = (req, res) => {
    res.render(path.join(__dirname, '../views/reservation'),{style: "styles-reservation"});
};

const register = (req, res) => {
    res.render(path.join(__dirname, '../views/register'),{style: "styles-register"});
};

const writeFormRegister = (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    rutaJson = path.join(__dirname,'../database/users.json');
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/register'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-register"
        });
}else{

    const {
        nombre,
        apellido,
        email,
        password,
        categoria,
    } = req.body;
    
    const img = req.file ? req.file.filename : '';
    let newImage;
    if(img.length > 0 ){
        newImage = `/images/users/${img}`;
    };
    
    const newId = users[users.length - 1].id + 1;
    
    let contrEncriptada = bcrypt.hashSync(password,10);
    
    const newUser ={
        id: newId,
        nombre,
        apellido,
        email,
        contrEncriptada,
        categoria,
        image: newImage,
    }
    users.push(newUser);
    let data = JSON.stringify(users);
    console.log(data);
    fs.writeFile(rutaJson, data, err => {
        if (err) {
            console.error(err);
        } else{
            res.redirect('/productDelivery');
        }
    } );
};
    

}

module.exports = {
    login,
    reservation,
    register,
    writeFormRegister
};