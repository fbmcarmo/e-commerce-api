async function validateInsertProduct(req, res, next){
    const { name, category, price } = req.body;

    if(!name || !category || !price){
        return res.status(400).send({
            error: "Nome, categoria e preço são obrigatórios"
        })
    }

    if(category.length > 255){
        return res.status(400).send({
            error: "Categoria não pode ter mais de 255 caracteres"
        })
    }

    next()
}

module.exports = {
    validateInsertProduct
}