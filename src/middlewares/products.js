const { upload } = require("../config/aws-s3");
const { Categories } = require("../models");

async function processImageUpload(req, res){
    return new Promise((resolve, reject) => {
        upload.single("image")(req, res, (err) => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

async function validateInsertProduct(req, res, next){

    try {
        await processImageUpload(req, res);

        if(req.file && req.file.location){
            req.body.image_url = req.file.location;
        }
    } catch (error) {
        return res.status(400).send({
            error: error.message || "Erro ao fazer upload da imagem"
        })
    }

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