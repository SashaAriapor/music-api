const { validationResult } = require("express-validator");
const { MusicModel } = require("../../models/music");
const path = require("path");
const fs = require("fs");
const { UserModel } = require("../../models/user");

class MusicController {
    async listen(req, res, next){
        try {
            const errorNotFound = {
                status: 404,
                success: false,
                message: "music notfound"
            }
            const musicID = req.params.id;
            if (!musicID.match(/^[0-9a-fA-F]{24}$/)) return res.json(errorNotFound);
            const { username } = req.user;
            const music = await MusicModel.findById(musicID);
            if(!music) return res.json(errorNotFound);
            const { author, status, mp3Path, views, _id } = music;
            const authorData = await UserModel.findById(author);
            if(status === "public" || authorData.username === username){
                const mp3url = `${req.protocol}://${req.get("host")}/${mp3Path.replace(/[\\\\]/gm, "/").slice(2)}`;
                const updateViews = views + 1;
                await MusicModel.findByIdAndUpdate({ _id }, { views: updateViews });
                res.json({
                    "musicUrl": mp3url,
                })
                }
                else {
                    res.json({
                        status: 403,
                        success: false,
                        message: "you dont have accsess to listen this music"
                    })
                }
        } catch (error) {
            next(error);
        }
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
                    music
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