const jwt = require("jsonwebtoken");

function verifyJwtToken(token){
        const result = jwt.verify(token, process.env.SECRET_KEY);
        if(!result?.username) throw { status: 401, message: "Please login to your account" }
        return result
}

module.exports = {
    verifyJwtToken
}