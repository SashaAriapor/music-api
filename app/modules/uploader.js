const multer = require("multer");
const path = require("path");
const { directoryGenerator } = require("./directoryGenerator");


function uploaderFile(directoryName, secondDirectoryName) {
    const storage = multer.diskStorage({
        destination : (req, file, cb) => { 
            cb(null, directoryGenerator(req.user.username, directoryName,  secondDirectoryName || req.body.name ));
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
    uploaderFile
}