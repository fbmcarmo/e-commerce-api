const express = require("express")
const router = express.Router()
const productsController = require("../controllers/products")
const productsMiddleware = require("../middlewares/products")

router.post(
    "/products", 
    productsMiddleware.validateInsertProduct,
    productsController.insertProduct
)

module.exports = router