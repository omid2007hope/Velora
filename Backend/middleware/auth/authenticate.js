const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../utils/httpError");

function extractToken(req) {
  const header = (req.headers?.authorization || "").trim();

  if (header) {
    const bearerMatch = header.match(/^Bearer\s+(.+)$/i);

    if (bearerMatch?.[1]) {
      return bearerMatch[1].trim();
    }

    // Backward-compatible fallback when clients send only the token value.
    return header;
  }

  const xAccessToken = req.headers?.["x-access-token"];

  if (typeof xAccessToken === "string" && xAccessToken.trim()) {
    return xAccessToken.trim();
  }

  if (Array.isArray(xAccessToken)) {
    const firstToken = xAccessToken.find(
      (token) => typeof token === "string" && token.trim(),
    );

    if (firstToken) {
      return firstToken.trim();
    }
  }

  return null;
}

function verifyTokenPayload(token) {
  const verificationSecrets = [
    process.env.JWT_SECRET,
    process.env.JWT_REFRESH_SECRET,
  ].filter(Boolean);

  let lastError;

  for (const secret of verificationSecrets) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Token verification failed");
}

function requireAuth(req, _res, next) {
  const token = extractToken(req);

  if (!token) {
    return next(createHttpError(401, "Authorization token required"));
  }

  try {
    const payload = verifyTokenPayload(token);

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
    const payload = verifyTokenPayload(token);

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
};
