const { body } = require("express-validator");
const path = require("path");
function imagevalidator() {
    return [
        body("image").custom((value, {req}) => {
            if (Object.keys(req?.file).length  == 0) throw "plese select one image and send it";
            const fileFromat = path.extname(req.file.originalname);
            const correctFormats = [".png", ".jpg", ".svg", ".jpeg", ".gif", ".webp"];
            if (!correctFormats.includes(fileFromat)) throw "The file sent is not correct";
            return true
        })
    ]
}
module.exports = {
    imagevalidator
}