const mongoose = require("mongoose");
const PlayListSchema = mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: "true" },
    likes: { type: Number, default: 0 },
    cover: { type: String, default: "../../defualt_cover.png" },
    musics: { type: Array, default: [] },
    private: { type: Boolean, required:true }
});

const PlayListModel = mongoose.model("playList", PlayListSchema);
module.exports = {
    PlayListModel
}