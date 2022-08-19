const mongoose = require("mongoose");
const AlbumeSchema = mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, required: true },
    likes: { type: Number, default: 0 },
    cover: { type: String, default: "../../defualt_cover.png" },
    date: { type: Date, default: Date.now },
    musics: { type: Array, default: [] },
    private: { type: Boolean, required:true }
});

const AlbumeModel = mongoose.model("albume", AlbumeSchema);
module.exports = {
    AlbumeModel
}