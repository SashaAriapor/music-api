if (process.env.NODE_ENV !== "PRODUCTSHEN") {
    require("dotenv").config();
}
const Application = require("./app/server");
const PORT = 5500;
const DB_URL = "mongodb://localhost:27017/music-api";
new Application(PORT, DB_URL); 