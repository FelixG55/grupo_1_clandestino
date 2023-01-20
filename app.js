const express = require('express');
const path = require('path');
const app = express();


app.get('/productDetail', (req, res)=> {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})



app.use(express.static('public'));


app.get('/productCart', (req,res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'))
})
app.get('/index', (req,res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
})

app.get('/productCart2', (req,res) => {
    res.sendFile(path.join(__dirname, './views/productCart2.html'))
})

app.get('/login', (req,res) => {

    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get('/register', (req,res) => {

    res.sendFile(path.join(__dirname, './views/register.html'))
})

app.listen(3000, () => console.log('Respondiendo en el puerto 3000'));

