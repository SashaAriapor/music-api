module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL);
        this.ConfigApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    ConfigApplication(){
        const path = require("path");
        const bodyParser = require("body-parser");
        this.#app.use(bodyParser.json());
        this.#app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }
    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server is Runing >> http://localhost:5500`);
        });
    }
    configDatabase(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL, (error) => {
            if (error) throw error
            return console.log(`Connect to The Database successful`);
        });
    }
    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "route not found :("
            })
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "internal Server Error :(";
            return res.json({
                status,
                message
            })
        });
    }
    createRoutes(){
        const { AllRoutes } = require("./router/router");
        this.#app.use("/", AllRoutes);
    }
}