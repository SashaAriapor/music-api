const { MusicController } = require("../http/controllers/music.controller");
const { checkLogin } = require("../http/middleware/autoLogin");
const {  musicMp3Validator } = require("../http/validator/music");
const { uploaderFile } = require("../modules/uploader");

const router = require("express").Router()

router.post("/add", checkLogin, uploaderFile("songs").single("music"), musicMp3Validator(), MusicController.add);




module.exports = {
    musicRoutes: router
}