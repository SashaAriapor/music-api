const router = require("express").Router()
const { registerValidator, loginValidator } = require("../http/validator/auth");
const { AuthController } = require("../http/controllers/auth.controller");


router.post("/register", registerValidator() ,AuthController.register);
router.post("/login", loginValidator() ,AuthController.login);

module.exports = {
    authRoutes: router
}