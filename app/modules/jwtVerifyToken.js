const jwt = require("jsonwebtoken");

function verifyJwtToken(token){
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY);
        if(!result?.username) throw { status: 401, message: "Please login to your account" }
        return result
    } catch (error) {
        throw { status: 401, message: "Please login to your account" }
    }
}

module.exports = {
    verifyJwtToken
}