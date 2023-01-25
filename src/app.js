const express = require('express');
const path = require('path');
const app = express();

const routerMain = require ('./routes/mainRoute');
const routerProduct = require ('./routes/productRoute');
const routerUser = require ('./routes/userRoute');

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(routerMain); 
app.use(routerProduct);
app.use(routerUser);


app.listen(3000, () => console.log('Respondiendo en el puerto 3000'));

