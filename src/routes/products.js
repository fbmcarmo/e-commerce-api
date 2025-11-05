const express = require("express")
const router = express.Router()
const productsController = require("../controllers/products")
const productsMiddleware = require("../middlewares/products")
const { authToken } = require("../middlewares/authToken")

router.post(
    "/products", 
    authToken(["seller", "admin"]),
    productsMiddleware.validateInsertProduct,
    productsController.insertProduct
)

module.exports = router