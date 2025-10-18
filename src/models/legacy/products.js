const db = require("../../config/pg")

async function insertProduct(product){
    const { name, category, price } = product;

    await db.query(`
        INSERT INTO products (name, category, price)
        VALUES ($1, $2, $3)
    `, [name, category, price])
}

async function getAllProducts(){
    const products = await db.query("SELECT * FROM products")

    return products.rows
}

module.exports = {
    insertProduct,
    getAllProducts
}