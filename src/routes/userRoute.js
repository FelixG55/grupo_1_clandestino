const express = require('express');
const { register, reservation, login, writeFormRegister } = require('../controllers/usersController');
const routerUser = express.Router();
const uploadUserFile = require('../middleware/multerUsersMiddelware.js')
const validations = require('../middleware/validateRegister')

routerUser.get('/register', register);
routerUser.post('/register',uploadUserFile.single('userImage'),validations, writeFormRegister);

routerUser.get('/reservation', reservation);
routerUser.get('/login', login);


module.exports = routerUser;