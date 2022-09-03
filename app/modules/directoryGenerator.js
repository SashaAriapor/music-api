const fs = require("fs");
const path = require("path");


function directoryGenerator(username, directoryName) {
    const directoryPath = path.join(__dirname, "..", "..", "public", "upload", username, directoryName);
    fs.mkdirSync(directoryPath, { recursive: true });
    return directoryPath;
}

module.exports = {
    directoryGenerator
}