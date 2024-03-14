const jwt = require('jsonwebtoken')

const tokenSign = async (user) => { //TODO: Genera Token
    console.log("user", user)
    return jwt.sign(
        {
            _id: user.id, //TODO: <---
            role: user.role
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET, //TODO ENV 
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async(token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}

module.exports = {tokenSign, verifyToken, decodeSign}