const { validationResult } = require("express-validator");
const { UserModel } = require("../../models/user");
const path = require("path");
const fs = require("fs");
class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            user.profile_image = `${req.protocol}://${req.get("host")}/${user.profile_image.replace(/[\\\\]/gm, "/").slice(2)}}`;
            return res.status(200).json({
                status: 200,
                succsess: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next){
        try {
            const data = req.body;
            const userID = req.user._id;
            console.log(userID);
            const fields = ["bio", "name"]; 
            const BadReq = ["", " ", null, undefined, 0, -1, NaN, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                console.log(data);              
                if(!fields.includes(key)) delete data[key];
                if(BadReq.includes(value)) delete data[key];
            })
            console.log(data);
            const result = await UserModel.updateOne({_id: userID}, {$set : data});
            console.log(result);
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status : 200,
                    succsess : true,
                    message: "the update user is successfuly"
                })
            }
            throw { status : 400, succsess: false, message: "the update user is not successfuly" };
        } catch (error) {
            next(error);
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const result = validationResult(req);
            if (Object.keys(result.errors).length == 0) {
                const userID = req.user._id;
                const username = req.user.username;
                const imagePath = `./upload/${username}/profile/${path.basename(req?.file?.path)}`;
                const resultUpdate = await UserModel.updateOne({ _id: userID }, { $set: { profile_image: imagePath } });
                if(resultUpdate.matchedCount > 0){
                    return res.status(200).json({
                        status: 200,
                        succsess: true,
                        message: "the update profile image is successfuly"
                    })
                }
                throw { status: 400, succsess: false, message: "the update user is not successfuly" };
            } else {
                if (req?.file?.path) {
                    fs.unlinkSync(req?.file?.path);
                }
                res.json(result);
                
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserController : new UserController()
}