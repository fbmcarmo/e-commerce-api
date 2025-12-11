const axios = require("axios")

const emailApi = axios.create({
    baseURL: process.env.EMAIL_API_URL,
    headers: {
        Authorization: process.env.SECRET_KEY_EMAIL_API
    }
})

module.exports = emailApi;