const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult}= require('express-validator');
const User = require('../models/User');
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
        let newImage = req.file ? req.file.filename : '';
        if(newImage.length > 0 ){
          image = `/images/users/${newImage}`;
        }else{
          image = `/images/users/defaultAvatar.jpg`
        };
        let password = bcrypt.hashSync(req.body.password,10);
        
    let userInDB = User.findByField('email',req.body.email)

    if (userInDB) {
       return res.render(path.join(__dirname, '../views/register'),{
            errors: {
                email: {
                    msg: 'Este mail ya esta registrado'
                }
            },
            oldData: req.body,
            style: "styles-register"
        });
    }
        
    let userToCreate = {
        ...req.body,
        password,
        image
    } 
       let userCreated = User.create(userToCreate); 
       return res.redirect('/login');
};
    
};

const writeFormLogin = function(req,res){

    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/login'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-login"
        });
    }else{
        
        let userToLogin = User.findByField('email',req.body.email);
        
        if (userToLogin) {

            let okPassword = bcrypt.compareSync(req.body.password,userToLogin.password);
            if (okPassword) {
                req.session.userLogged = userToLogin;
                return res.redirect('/')
            }
        }

        return res.render(path.join(__dirname, '../views/login'),{
            errors:{
                password:{
                    msg: 'Usuario o contraseña no vaálidos'
                }
            },
            style: "styles-login"
        }
    )}
}

const logout = function(req,res){
req.session.destroy();
res.redirect('/');
}

module.exports = {
    login,
    reservation,
    register,
    writeFormRegister,
    writeFormLogin,
    logout
};