const express = require("express")
const Route = express.Router()
const {products, product, lastProduct, detailProducts} = require("../controllers/productsControllers")

Route.get("/products", products)
Route.get("/products/last", lastProduct)
Route.get("/products/:id", product)
Route.get("/detail", detailProducts)
module.exports = Route