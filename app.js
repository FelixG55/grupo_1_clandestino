const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/productDetail', (req, res)=> {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})

app.get('/productCart', (req,res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'))
})
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
})
        
app.get('/reservation', (req,res) => {
    res.sendFile(path.join(__dirname, './views/reservation.html'))
})

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, './views/register.html'))
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get('/location', (req,res) => {
    res.sendFile(path.join(__dirname, './views/location.html'))
})

app.listen(3000, () => console.log('Respondiendo en el puerto 3000'));

