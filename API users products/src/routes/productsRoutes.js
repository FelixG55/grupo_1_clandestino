const express = require("express")
const Route = express.Router()
const {products, product } = require("../controllers/productsControllers")

Route.get("/products", products)
Route.get("/products/:id", product)
// Route.get("/categori/:id", categori)


module.exports = Route