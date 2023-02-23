const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const port = process.env.PORT || 3030;
const app = express();

const routerMain = require ('./routes/mainRoute');
const routerProduct = require ('./routes/productRoute');
const routerUser = require ('./routes/userRoute');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine','ejs');

app.use(routerMain); 
app.use(routerProduct);
app.use(routerUser);


app.listen(port, () => console.log(`Respondiendo en el puerto ${port}`));

