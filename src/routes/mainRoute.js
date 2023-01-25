const express= require('express');

const {index, location} = require ('../controllers/mainController');
const routerMain = express.Router();

routerMain.get ('/', index);
routerMain.get ('/location', location);

module.exports = routerMain;




