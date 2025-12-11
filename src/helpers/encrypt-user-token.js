const CryptoJS = require("crypto-js")
const redisClient = require("../config/redis")

async function encryptUserToken(user){

    try {
        const hashedUser = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.ENCRYPT_SECRET).toString()

        await redisClient.set(`user:${user.id}`, hashedUser, {EX: 7 * 24 * 60 * 60})

        return hashedUser
    } catch (error) {
        throw new Error("Erro ao criptografar user", error)
    }

}

module.exports = {
    encryptUserToken
}