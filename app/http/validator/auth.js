const { body } = require("express-validator");
const { UserModel } = require("../../models/user");
const { ageCalculator } = require("../../modules/ageCalculator");
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
        body("dateOfBirth").custom((value, ctx) => {
            const userYear = ageCalculator(value);
            const userYearInt = parseInt(userYear);
            if (userYearInt < 0){
                throw "You are not born yet, When you were born and turned 16 years old you can register!";
            }
            if (userYearInt < 16 ) {
                throw "You are still a child!, You cant Register";
            }
            if (userYearInt > 99) {
                throw "You are fooling us >:("
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