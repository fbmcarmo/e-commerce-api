const jwt = require("jsonwebtoken")

async function login(req, res){
    try {
        const user = req.user;

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "30d"}
        )

        return res.send({token})
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    login
}