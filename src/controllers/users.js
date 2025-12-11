const { sendEmail } = require("../helpers/email-service")
const { encryptUserToken } = require("../helpers/encrypt-user-token")
const { templateEmail } = require("../helpers/templateEmail")
const { Users } = require("../models")

async function createUser(req, res){
    try {
        const user = await Users.create(req.body)

        const token = await encryptUserToken(user)

        const template = await templateEmail(user.name, `${process.env.FRONTEND_URL}/active-user?token=${token}`)

        await sendEmail(
            user.email,
            user.name,
            "Bem-vindo ao nosso e-commerce",
            template
        )

        return res.status(201).send({
            message: "Usuário criado com sucesso"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    createUser
}