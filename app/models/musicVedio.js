const mongoose = require("mongoose");
const MusicVedioSchema = mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    commands: { type: Array, default: [] },
    cover: { type: String, default: "../../defualt_cover.png" },
    mp4: {  type:String, required: true },
    date: { type: Date, default: Date.now },
    albums: { type: mongoose.Types.ObjectId, default: none },
    private: { type: Boolean, required:true }
});

const MusicVedioModel = mongoose.model("musicVedio", MusicVedioSchema);
module.exports = {
    MusicVedioModel
}