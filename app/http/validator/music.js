const { body } = require("express-validator");
const path = require("path");
function musicCoverValidator() {
    return [
        body("cover").custom((value, {req}) => {
            if (!req.file) throw "plese select cover and send it";
            const fileFormat = path.extname(req.file.originalname);
            const correctFormats = [".png", ".jpg", ".svg", ".jpeg", ".gif", ".webp"];
            if (!correctFormats.includes(fileFormat)) throw "The file sent is not correct";
            return true;
        }),
    ]
}
function musicMp3Validator() {
    return [    
        body("music").custom((value, {req}) => {
            if (!req.file) throw "plese select music file and send it";
            const fileFormat = path.extname(req.file.originalname);
            if (fileFormat != ".mp3") throw "The mudic file sent is not correct";
            return true;
        }),
        body("name").notEmpty().withMessage("field name can,t empty"),
        body("status").custom((value, ctx) => {
            if(!value) throw "field status can,t empty";
            if(value === "public") return true;
            if(value === "private") return true;
            throw "this status is undefined";
        })
    ]
}

module.exports = {
    musicCoverValidator,
    musicMp3Validator
}