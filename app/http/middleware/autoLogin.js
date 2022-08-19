const { verifyJwtToken } = require("../../modules/jwtVerifyToken");
const { UserModel } = require("../../models/user")
const checkLogin = async (req, res, next) => {
try {
    const authErorr = { status: 401, message: "Please login to your account" }
    const autorization = req?.headers?.authorization;
    if(!autorization) throw authErorr
    const token = autorization.split(" ")?.[1];
    if(!token)  throw authErorr
    const result = verifyJwtToken(token);
    const { username } = result;
    const user = await UserModel.findOne({ username }, { password: 0 });
    if(!user) throw authErorr
    req.user = user;
    return next();
} catch (error) {
    next(error)
}

}

module.exports = {
    checkLogin
}
