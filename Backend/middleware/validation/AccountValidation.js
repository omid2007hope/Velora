const { validateBody } = require("./common");
const { profileSchema } = require("../../validation/schemas");

module.exports = {
  validateCreateAccountProfile: validateBody(profileSchema),
};
