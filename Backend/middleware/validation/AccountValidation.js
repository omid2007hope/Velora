const { validateBody } = require("./common");
const { profileSchema } = require("../../validation");

module.exports = {
  validateCreateAccountProfile: validateBody(profileSchema),
};
