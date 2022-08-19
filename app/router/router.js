const router = require("express").Router()
const { albumeRoutes } = require("./albume");
const { musicRoutes } = require("./music");
const { musicVedioRoutes } = require("./musicVedio");
const { playlistRoutes } = require("./Playlist");
const { authRoutes } = require("./auth");
const { userRoutes } = require("./user");

router.use("/auth", authRoutes);
router.use("/music", musicRoutes);
router.use("/albume", albumeRoutes);
router.use("musicVedio", musicVedioRoutes);
router.use("playList", playlistRoutes);
router.use("/user", userRoutes);

module.exports = {
    AllRoutes: router
}