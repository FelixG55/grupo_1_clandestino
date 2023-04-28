const {check}= require('express-validator');
const path = require('path');
const db = require('../database/models');
const { log } = require('console');

let validateRegister = [
    check('name')
        .notEmpty().withMessage('Tienes que escribir un nombre').isLength({min:2}).withMessage('Debe tener mas de dos caracteres'),
    check('lastname')
        .notEmpty().withMessage('Tienes que escribir el apellido').isLength({min:2}).withMessage('Debe tener mas de dos caracteres'),
    check('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Tienes que escribir un mail válido')
        .custom(async (email) => {
            const existingUser =
                await db.User.findAll({
                    where: {email: email}
                })
                console.log(typeof existingUser);
            if (existingUser.length>0) {
                throw new Error('Email ya registrado, utilice otro')
            }
        }),    
    check('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una Minuscula')
        .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una Mayuscula')
        .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un numero')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe tener al menos un caracter especial (!@#$%^&*(),.?":{}|<>)'),
    check('admin')
        .notEmpty().withMessage('Tienes que escoger una categoria'),
    check('image').custom((value, {req}) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg','jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error ('Tienes que elegir una imagen'); 
        }else{
            let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error (`La extensión del archivo permitida es ${acceptedExtensions.join(', ')}`) 
        }
        return true;
    }
    })  
]
module.exports = validateRegister;