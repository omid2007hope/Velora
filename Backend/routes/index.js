const express = require("express");
const router = express.Router();

const versionOneRoutes = require("./versionOne");
const apiVersions = [["/v1", versionOneRoutes]];

function serverHealth(_req, res) {
  return res.status(200).send("server is running");
}

router.get("/server", serverHealth);

apiVersions.forEach(([path, versionRouter]) => {
  router.get(`${path}/server`, serverHealth);
});

router.use(versionOneRoutes);
apiVersions.forEach(([path, versionRouter]) => {
  router.use(path, versionRouter);
});

module.exports = router;
