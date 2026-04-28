const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../utils/httpError");

function extractToken(req) {
  const header = (req.headers?.authorization || "").trim();

  if (header) {
    const bearerMatch = header.match(/^Bearer\s+(.+)$/i);

    if (bearerMatch?.[1]) {
      return bearerMatch[1].trim();
    }
  }

  return null;
}

function verifyAccessToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.tokenType && payload.tokenType !== "access") {
    throw new Error("Invalid token type");
  }

  return payload;
}

function verifyRefreshToken(token) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  if (payload.tokenType !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload;
}

function requireAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next(createHttpError(401, "Authorization token required"));
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
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

function requireSeller(req, _res, next) {
  return requireAuth(req, _res, (error) => {
    if (error) {
      return next(error);
    }

    if (req.user?.role !== "seller") {
      return next(createHttpError(403, "Seller access required"));
    }

    return next();
  });
}

module.exports = {
  requireAuth,
  optionalAuth,
  requireSeller,
  verifyRefreshToken,
};
