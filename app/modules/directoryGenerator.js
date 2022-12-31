const fs = require("fs");
const path = require("path");


function directoryGenerator(username, directoryName, secondDirectoryName = "/" ) {
    const directoryPath = path.join(__dirname, "..", "..", "public", "upload", username, directoryName, secondDirectoryName);
    fs.mkdirSync(directoryPath, { recursive: true });
    return directoryPath;
}

module.exports = {
    directoryGenerator
}