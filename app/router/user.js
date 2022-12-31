const { UserController } = require("../http/controllers/user.controller");

const { checkLogin } = require("../http/middleware/autoLogin");
const { imagevalidator } = require("../http/validator/user");
const  { uploaderFile } = require("../modules/uploader");
const router = require("express").Router()

router.get("/profile", checkLogin, UserController.getProfile);
router.post("/profile", checkLogin, UserController.editProfile);
router.post("/profile-image", checkLogin, uploaderFile("profile").single("image"),  imagevalidator(), UserController.uploadProfileImage);
router.delete("/profile-image", checkLogin, UserController.deleteProfileImage);

module.exports = {
    userRoutes: router
}