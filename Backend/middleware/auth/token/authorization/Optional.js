const extractToken = require("../Extraction");
const verifyAccessToken = require("../verification/Access");

function optionalAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next();
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch (_error) {
    // Ignore invalid token on optional auth.
  }

  return next();
}

module.exports = optionalAuth;
