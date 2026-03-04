// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const jwt = require("jsonwebtoken");

function extractToken(req) {
  const header = req.headers?.authorization || "";
  if (header.startsWith("Bearer ")) {
    return header.replace("Bearer ", "").trim();
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function optionalAuth(req, _res, next) {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
  } catch (error) {
    // Ignore invalid token on optional auth
  }
  return next();
}

module.exports = {
  requireAuth,
  optionalAuth,
};
