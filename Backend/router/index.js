const express = require("express");
const router = express.Router();

const { CustomerData } = require("../controller/version_1/Register");
const { CustomerDetails } = require("../controller/version_1/Account");
const { loginIntoTheAccount } = require("../controller/version_1/Login");
const { CustomerAddress } = require("../controller/version_1/Address");

router.get("/server", (req, res) => {
  return res.status(200).send("server is running");
});

router.post("/server/customer", CustomerData);

router.post("/server/customer/login", loginIntoTheAccount);

router.post("/server/customer/login/account", CustomerDetails);

router.post("/server/customer/login/account/address", CustomerAddress);

module.exports = router;
