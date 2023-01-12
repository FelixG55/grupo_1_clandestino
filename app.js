const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})

app.get('/productDetail', (req, res)=> {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})


app.listen(3030, ()=>{
    console.log('Servidor corriendo en el puerto 3030');
})

app.use(express.static('public'));

