const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult}= require('express-validator');
const db = require('../database/models');
const { log } = require('console');


// Renderiza la vista del formulario e login
const login = (req, res) => {
    res.render(path.join(__dirname, '../views/login'),{style: "styles-login"});
};

// Renderiza la vista del fornmulario de reservación
const reservation = (req, res) => {
    res.render(path.join(__dirname, '../views/reservation'),{style: "styles-reservation"});
};

// Renederiza la vista del fomrulario de registro
const register = (req, res) => {
    res.render(path.join(__dirname, '../views/register'),{style: "styles-register"});
};

// Registra a un nuevo usuario
const writeFormRegister = (req, res) => {
    
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
        db.User.findAll({
            where: {email: req.body.email} 
        }).then(userInDB =>{
            if (userInDB.length > 0) {
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
            let cryptPassword = bcrypt.hashSync(req.body.password,10);
            db.User.create({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: cryptPassword,
                admin: req.body.admin,
                image: image
            })
            return res.redirect('/login');
        })
};
    
};

//Login de un usuario
const writeFormLogin = function(req,res){
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.render(path.join(__dirname, '../views/login'),{
            errors: resultValidation.mapped(),
            oldData: req.body,
            style: "styles-login"
        });
    }else{
        db.User.findAll({
            where: {email: req.body.email}
        }).then(userToLogin => {
            if (userToLogin) {
                let okPassword = bcrypt.compareSync(req.body.password,userToLogin[0].password);
                console.log(req.body.password);
                if (okPassword) {
                    req.session.userLogged = userToLogin[0];
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
            })
        })
    }
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