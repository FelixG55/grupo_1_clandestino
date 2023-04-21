const { Router } = require('express');
const express = require('express');
const { register, reservation, login, writeFormRegister, writeFormLogin,logout } = require('../controllers/usersController');
const routerUser = express.Router();
const uploadUserFile = require('../middleware/multerUsersMiddelware.js')
const validationsReg = require('../middleware/validateRegister')
const validationLog = require('../middleware/validateLogin')
const guestMiddelware = require('../middleware/guestMiddelware')

routerUser.get('/register',guestMiddelware, register);
routerUser.post('/register',uploadUserFile.single('image'),validationsReg, writeFormRegister);

routerUser.get('/reservation', reservation);

routerUser.get('/login',guestMiddelware, login);
routerUser.post('/login',validationLog,writeFormLogin);

routerUser.get('/logout/',logout)


module.exports = routerUser;