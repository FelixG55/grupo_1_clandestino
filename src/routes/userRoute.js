const express = require('express');

const { register, reservation, login } = require('../controllers/usersController');
const routerUser = express.Router();

routerUser.get('/register', register);
routerUser.get('/reservation', reservation);
routerUser.get('/login', login);

module.exports = routerUser;