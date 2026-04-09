const { createHttpError } = require("./httpError");
const { isValidObjectId } = require("./validators");

function getAuthorizedUserId(req) {
  const userId = req.user?.id;

  if (!isValidObjectId(userId)) {
    throw createHttpError(401, "Unauthorized");
  }

  return userId;
}

module.exports = getAuthorizedUserId;
