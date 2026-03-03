const model = require("../../model/Customer");
const BaseService = require("../BaseService");

module.exports = new (class Login extends BaseService {
  async loginService(email, password) {}
})(model);
