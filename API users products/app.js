const express = require("express")
const app  = express()
const path = require("path")

const port = process.env.PORT || 3022
app.listen(port, (req, res) => console.log(`Se esta corriendo el servidor ${port}`) )
app.set("view engine", "ejs")
app.use(express.json())

const usersRoutes = require("./src/routes/userRoutes.js") 
const productsRoutes = require("./src/routes/productsRoutes.js") 


app.use("/api",usersRoutes)
app.use("/api", productsRoutes)
