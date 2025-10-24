const express = require('express')
const router = express.Router()

const categoriesController = require("../controllers/categories")
const categoriesMiddleware = require("../middlewares/categories")

router.post(
    "/categories",
    categoriesMiddleware.validateInsertCategory,
    categoriesController.insertCategory
)

module.exports = router;