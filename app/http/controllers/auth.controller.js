const { validationResult } = require("express-validator");
const { hashString } = require("../../modules/hasher");
const { UserModel } = require("../../models/user");
const bcrypt = require("bcrypt");
const { jwtTokenGenerator } = require("../../modules/jwtTokenGenerator");
class AuthController{
    async register (req, res, next){        
        try {
            const result = validationResult(req);
            const { username, email, password, age } = req.body;
            const hashed_password = hashString(password);
            if (Object.keys(result.errors).length == 0) {
                const user = await UserModel.create({
                    username,
                    password: hashed_password,
                    email,
                    age       
                })
                res.json(user)
            } else {
                res.json(result)
            }
        } catch (error){
            next(error);
        }
    }
    async login(req, res, next){
        try {
            const result = validationResult(req);
            if (Object.keys(result.errors).length == 0) {
                    const { username, password } = req.body;
                    const user = await UserModel.findOne({ username })
                    if (!user) throw {status: 401, message: "username or password is incorrect"}
                    const compareResult = bcrypt.compareSync(password, user.password); 
                    if (!compareResult) throw {status: 401, message: "username or password is incorrect"}
                    const token = jwtTokenGenerator({ username });
                    user.token = token;
                    user.save();
                    return res.status(200).json({
                        status : 200,
                        success: true,
                        message: "You have successfully logged into your account",
                        token
                    })
            }
            else {
                res.json(result)
            }
        } catch (error) {
            next(error)
        }
    }
    resatPassword(){

    }

}

module.exports = {
    AuthController : new AuthController()
}