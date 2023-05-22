const {check}= require('express-validator');
const path = require('path');


let validateFormProduct = [
    check('name')
        .notEmpty().withMessage('Tienes que escribir el nombre el producto').isLength({min:5})
        .withMessage('Debe tener al menos 5 caracteres'),
    check('description')
        .notEmpty().withMessage('Tienes que escribir la descripción del producto').isLength({min:20})
        .withMessage('Debe tener al menos 20 caracteres'),
    check('price')
        .notEmpty().withMessage('Tienes que escribir el precio del procuto').bail()
        .isNumeric().withMessage('Escriba un valor númerico'),
    check('category')
        .notEmpty().withMessage('Tienes que escoger la categoria del producto'),
    check('delivery')
        .notEmpty().withMessage('Tienes que escoger una opción'),
    check('image').custom((value, {req}) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg', 'jpeg' ,'.png', '.gif'];
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
module.exports = validateFormProduct;