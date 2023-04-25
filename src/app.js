const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride =  require('method-override');
const app = express();

const routerMain = require ('./routes/mainRoute');
const routerProduct = require ('./routes/productRoute');
const routerUser = require ('./routes/userRoute');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Mensaje super secreto',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');

app.use(routerMain); 
app.use(routerProduct);
app.use(routerUser);


app.listen(3000, () => console.log('Respondiendo en el puerto 3000'));

