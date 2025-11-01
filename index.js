//import commonJs
require("dotenv").config()
const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products")
const categoriesRoutes = require("./src/routes/categories")
const usersRoutes = require("./src/routes/users")
const authRoutes = require("./src/routes/auth")
require('./src/models')

app.use(express.json())
const PORT = 4467;

app.use(productsRoutes)
app.use(categoriesRoutes)
app.use(usersRoutes)
app.use(authRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})