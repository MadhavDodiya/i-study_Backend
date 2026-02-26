const express = require("express");
const { getHomeData } = require("../controller/contentController");

const router = express.Router();

router.get("/home", getHomeData);

module.exports = router;
