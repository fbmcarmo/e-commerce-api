const express = require("express")
const router = express.Router()
const productsController = require("../controllers/products")
const productsMiddleware = require("../middlewares/products")
const { authToken } = require("../middlewares/authToken")
const axios = require("axios")

router.post(
    "/products", 
    authToken(["seller", "admin"]),
    productsMiddleware.validateInsertProduct,
    productsController.insertProduct
)

router.get(
    "/products",
    productsController.getAllProducts
)

router.get("/products/service", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4505", {
            headers: {
                "Authorization": process.env.SECRET_KEY_EMAIL_API
            }
        })
        return res.send(response.data)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
})

module.exports = router