const express = require("express");
const router = express.Router();

const { CustomerData } = require("../controller/version_1/Customer");
const { CustomerDetails } = require("../controller/version_1/CustomerDetails");
const { loginIntoTheAccount } = require("../controller/version_1/Login");

router.get("/server", (req, res) => {
  return res.status(200).send("server is running");
});

router.post("/server/customer", CustomerData);

router.post("/server/customer/login", loginIntoTheAccount);

router.post("/server/customer/details", CustomerDetails);

module.exports = router;
