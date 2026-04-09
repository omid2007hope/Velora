const express = require("express");
const router = express.Router();

const versionOneRoutes = require("./versionOne");

function serverHealth(_req, res) {
  return res.status(200).send("server is running");
}

router.get("/server", serverHealth);
router.get("/v1/server", serverHealth);

router.use(versionOneRoutes);
router.use("/v1", versionOneRoutes);

module.exports = router;
