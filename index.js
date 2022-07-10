const Application = require("./app/server");
const PORT = 5500;
const DB_URL = "mongodb+srv://Admin:ZiTET144hHUck2FE@cluster0.utlg6.mongodb.net/music_website";
new Application(PORT, DB_URL);