const jwt = require("jsonwebtoken");

function jwtTokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7 days" })
    return token
}

module.exports = {
    jwtTokenGenerator
}