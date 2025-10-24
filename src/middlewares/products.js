const { Categories } = require("../models");

async function validateInsertProduct(req, res, next){
    const { 
        name, 
        price, 
        category_id, 
        shipping,
        warranty,
        return_policy 
    } = req.body;

    if(!name || !price || !category_id || !shipping || !warranty || !return_policy){
        return res.status(400).send({
            error: "Todos os campos são obrigatórios"
        })
    }

    if(name.length > 255){
        return res.status(400).send({
            error: "Nome não pode ter mais de 255 caracteres"
        })
    }

    try {
        const category = await Categories.findByPk(category_id)

        if(!category){
            return res.status(400).send({
                error: "Categoria não encontrada"
            })
        }
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }

    req.body.return = return_policy;

    next()
}

module.exports = {
    validateInsertProduct
}