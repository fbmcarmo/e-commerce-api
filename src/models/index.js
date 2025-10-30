const sequelize = require("../config/database")
const Products = require("./products")
const Categories = require("./categories")
const ProductsImages = require("./products_images")

sequelize.sync({ alter: true })
    .then(() => console.log('Tabelas sincronizadas'))
    .catch(
        (error) => console.error('Erro ao sincronizar tabelas:', error)
    )

module.exports = {
    Products,
    Categories,
    ProductsImages
}