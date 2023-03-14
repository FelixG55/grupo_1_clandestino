const {check}= require('express-validator');
const path = require('path');


let validateLogin = [
    
    check('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Tienes que escribir un mail válido'),    
    check('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña'),
]
module.exports = validateLogin;