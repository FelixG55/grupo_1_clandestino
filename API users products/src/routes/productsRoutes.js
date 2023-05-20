const express = require("express")
const Route = express.Router()
const {products, product, categori, lastProduct} = require("../controllers/productsControllers")

Route.get("/products", products)
Route.get("/products/last", lastProduct)
Route.get("/products/:id", product)
Route.get("/categori/:id", categori)
module.exports = Route