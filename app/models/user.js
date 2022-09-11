const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, uniqe:true },
    email: { type: String, required: true, uniqe:true },
    password: { type: String, required: true },
    name: { type: String, default: "user"},
    bio: { type: String, default: "" },
    jender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    musics: { type: [mongoose.Types.ObjectId], default: [] },
    fallowers: { type: [mongoose.Types.ObjectId], default: [] },
    fallowings: { type: [mongoose.Types.ObjectId], default: [] },
    Playlists: { type: [mongoose.Types.ObjectId], default: [] },
    Likes: { type: [mongoose.Types.ObjectId], default: [] },
    roles: { type: [String], default : ["USER"] },
    profile_image: { type: String, default: "./defualts/defualt_user.png" },
    token: { type: String, default: "",}
})

const UserModel = mongoose.model("Users", UserSchema);
module.exports = {
    UserModel
}