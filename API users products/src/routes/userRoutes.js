const express = require("express")
const Route = express.Router()
const {usuarios, usuario} = require("../controllers/usersController")

Route.get("/users", usuarios)
Route.get("/users/:id", usuario)

module.exports = Route