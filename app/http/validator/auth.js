const { body } = require("express-validator");
const { UserModel } = require("../../models/user");
function registerValidator() {
    return [
        body("username").custom(async (value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if (usernameRegex.test(value)) {
                    const user = await UserModel.findOne({ username: value })
                    if (!user) {
                        return true
                    }
                    throw "username has already exited"
                }
                throw "username is un vaild"
            }
            throw "username field can,t empty"
        }),
        body("email").isEmail().withMessage("your email is wrong !")
        .custom(async (value, ctx) => {
            const email = await UserModel.findOne({ email: value })
            if (!email) {
                return true
            }
            throw "email has already exited"
        }),
        body("password").custom((value, ctx) => {
            if(!value) throw "password field can,t empty"
            if (value.length < 6) {
                throw "password is short, min: 6"
            }
            if (value.length > 16) {
                throw "password is long, max: 16"
            }
            return true
        }),
        body("age").custom((value, ctx) => {
            if (!value) {                
                throw "age field can,t empty"
            }
                            if (value > 99) {
                    throw "Your age is lie"
                }
                if (value < 12) {
                    throw "your are child now"
                }
                return true
        })
    ]
}
function loginValidator(){
    return [
        body("username").custom( async(value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if (usernameRegex.test(value)) {
                        return true
                }
                throw "username or password is incorrect"
            }
            throw "username field can,t empty"
        }),
        body("password").custom((value, ctx) => {
            if (value) {
                if (value.length < 6) {
                    throw "password is short, min: 6"
                }
                if (value.length > 16) {
                    throw "password is long, max: 16"
                }
                return true
            }
            throw "password field can,t empty"
        })
    ]
}

module.exports = {
    registerValidator,
    loginValidator
}