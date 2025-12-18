const jwt = require("jsonwebtoken");
const { decryptUserToken, encryptUserToken } = require("../helpers/encrypt-user-token");
const redisClient = require("../config/redis");
const { Users } = require("../models");
const { templateEmail } = require("../helpers/templateEmail");
const { sendEmail } = require("../helpers/email-service");

async function login(req, res){
    try {
        const user = req.user;

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        return res.send({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image_url
            }
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function activeUser(req, res){
    try {
        const { token } = req.body;

        const cleanedToken = token.replace(/ /g, "+")

        const user = await decryptUserToken(cleanedToken)

        if(!user){
            return res.status(400).send({
                error: "Token inválido"
            })
        }

        const redisToken = await redisClient.get(`user:${user.id}`)

        if(!redisToken || redisToken !== cleanedToken){
            return res.status(400).send({
                error: "Token inválido"
            })
        }

        await Users.update({ active: true }, { where: {
            id: user.id
        }})

        await redisClient.del(`user:${user.id}`)

        return res.send({
            message: "Usuário ativado com sucesso"
        })

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function getActiveTokenData(req, res){
    try {
        const { token } = req.body;
    
        const user = await Users.findByPk(token)
        if(!user){
            return res.status(400).send({
                error: "Token inválido"
            })
        }

        const redisToken = await redisClient.get(`user:${token}`)

        let hashedToken = redisToken;

        if(!redisToken){
            hashedToken = await encryptUserToken(user)

            await redisClient.set(`user:${user.id}`, hashedToken, {EX: 7 * 24 * 60 * 60})
        }

        const template = await templateEmail(
            user.name,
            `${process.env.FRONTEND_URL}/active-user?token=${hashedToken}`
        )

        await sendEmail(
            user.email,
            user.name,
            "Ativação de conta",
            template
        )

        return res.send({
            message: "Email de ativação enviado com sucesso"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    login,
    activeUser,
    getActiveTokenData
}