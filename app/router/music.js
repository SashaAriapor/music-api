const { MusicController } = require("../http/controllers/music.controller");
const { checkLogin } = require("../http/middleware/autoLogin");
const {  musicMp3Validator } = require("../http/validator/music");
const { uploaderFile } = require("../modules/uploader");

const router = require("express").Router()

router.post("/add", checkLogin, uploaderFile("songs").single("music"), musicMp3Validator(), MusicController.add);
router.get("/listen/:id", checkLogin, MusicController.listen);



module.exports = {
    musicRoutes: router
}