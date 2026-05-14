const express = require("express");
const router = express.Router();

function serverHealth(_req, res) {
  return res.status(200).send("server is running");
}

router.get("/server", serverHealth);

const versionOneRoutes = require("./versionOne");

router.use(versionOneRoutes);

module.exports = router;
