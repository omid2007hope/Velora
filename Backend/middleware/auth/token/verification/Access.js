const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../../../utils/httpError");

function verifyAccessToken(token) {
  if (!process.env.JWT_SECRET) {
    throw createHttpError(500, "JWT_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.tokenType && payload.tokenType !== "access") {
    throw createHttpError(401, "Invalid token type");
  }

  return payload;
}

module.exports = verifyAccessToken;
