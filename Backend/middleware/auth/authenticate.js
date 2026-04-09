const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../utils/httpError");

function extractToken(req) {
  const header = req.headers?.authorization || "";

  if (header.startsWith("Bearer ")) {
    return header.replace("Bearer ", "").trim();
  }

  return null;
}

function requireAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next(createHttpError(401, "Authorization token required"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    return next();
  } catch (_error) {
    return next(createHttpError(401, "Invalid or expired token"));
  }
}

function optionalAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };
  } catch (_error) {
    // Ignore invalid token on optional auth.
  }

  return next();
}

module.exports = {
  requireAuth,
  optionalAuth,
};
