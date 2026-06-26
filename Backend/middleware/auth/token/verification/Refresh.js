const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../utils/httpError");

function verifyRefreshToken(token) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw createHttpError(500, "JWT_REFRESH_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  if (payload.tokenType !== "refresh") {
    throw createHttpError(401, "Invalid token type");
  }

  return payload;
}

module.exports = verifyRefreshToken;
