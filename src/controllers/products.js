const { Products } = require("../models");

async function insertProduct(req, res){
    try {
        await Products.create(req.body)

        return res.status(201).send({
            message: "Produto criado com sucesso"
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    insertProduct
}