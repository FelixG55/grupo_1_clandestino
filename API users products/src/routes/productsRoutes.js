const express = require("express")
const Route = express.Router()
const {products, product, lastProduct, detailProducts,sales} = require("../controllers/productsControllers")

Route.get("/products", products)
Route.get("/products/last", lastProduct)
Route.get("/products/:id", product)
Route.get("/detail", detailProducts)
Route.get("/sales", sales)
module.exports = Route