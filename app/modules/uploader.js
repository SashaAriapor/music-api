const multer = require("multer");
const path = require("path");
const { directoryGenerator } = require("./directoryGenerator");

function uploader(directoryName) {
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, directoryGenerator(req.user.username, directoryName));
        },
        filename : (req, file, cb) => {
            const fileFormat = path.extname(file.originalname || "");
            cb(null, Date.now() + fileFormat);
        }
    })    
    const uploader = multer({ storage });
    return uploader;
}

module.exports = {
    uploader
}