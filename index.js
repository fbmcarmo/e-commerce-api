//import commonJs
const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products")
const categoriesRoutes = require("./src/routes/categories")
require('./src/models')

app.use(express.json())
const PORT = 4467;

app.use(productsRoutes)
app.use(categoriesRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})