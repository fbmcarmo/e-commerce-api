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

async function decryptUserToken(token){
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.ENCRYPT_SECRET)

        const originalText = bytes.toString(CryptoJS.enc.Utf8)

        return JSON.parse(originalText)
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    encryptUserToken,
    decryptUserToken
}