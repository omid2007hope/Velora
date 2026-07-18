const generalValidation = require("./general/GeneralValidation");
const authValidation = require("./general/AuthValidation");
const customerValidation = require("./customer/customerValidation");
const registerCustomerValidation = require("./register/Customer");
const registerSellerValidation = require("./register/Seller");
const loginCustomerValidation = require("./login/Customer");
const loginSellerValidation = require("./login/Seller");
const storeValidation = require("./store/StoreValidation");
const productValidation = require("./product/productValidation");
const reviewValidation = require("./review/reviewValidation");

module.exports = {
  ...generalValidation,
  ...authValidation,
  ...customerValidation,
  ...registerCustomerValidation,
  ...registerSellerValidation,
  ...loginCustomerValidation,
  ...loginSellerValidation,
  ...storeValidation,
  ...productValidation,
  ...reviewValidation,
};
