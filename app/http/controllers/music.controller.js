const { validationResult } = require("express-validator");
const { MusicModel } = require("../../models/music");
const path = require("path");
const fs = require("fs");

class MusicController {
    listen(){

    }
    async add(req, res, next){
        try {
            const result = validationResult(req);
            if (Object.keys(result.errors).length == 0) {
                const { name, status } = req.body;
                const { username, _id } = req.user;
                const mp3Path = `./upload/${username}/songs/${path.basename(req?.file?.path)}`;
                const music = await MusicModel.create({
                    name,
                    mp3Path,
                    status,
                    author: _id,
                })
                res.json({
                    status: 200,
                    success: true,
                    message: "the upload music is successfuly",
                });
            }
            else {
                if(req?.file?.path){
                    fs.unlinkSync(req?.file.path);
                }
                res.json(result);
            }
        } catch (error) {
            next(error)
        }
    }
    like(){

    }
    command(){

    }
    addToPlaylist(){

    }
    report(){

    }
    delete(){

    }
    edit(){

    }

}

module.exports = {
    MusicController: new MusicController()
}