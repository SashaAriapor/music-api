const mongoose = require("mongoose");
const MusicSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    cover: { type: String, default: "./defualts/defualt_cover.png" },
    mp3Path: {  type:String, required: true},
    date: { type: Date, default: Date.now() },
    albums: { type: mongoose.Types.ObjectId },
    status: { type: String, required: true }
});

const MusicModel = mongoose.model("music", MusicSchema);
module.exports = {
    MusicModel
}