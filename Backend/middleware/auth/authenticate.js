const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../utils/httpError");
const storeService = require("../../services/StoreService");
const productService = require("../../services/ProductService");
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
    throw createHttpError(500, "JWT_SECRET is not set");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.tokenType && payload.tokenType !== "access") {
    throw createHttpError(401, "Invalid token type");
  }

  return payload;
}

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

function requireSellerHasStore(req, _res, next) {
  return requireAuth(req, _res, async (error) => {
    if (error) {
      return next(error);
    }

    if (req.user?.role !== "seller") {
      return next(createHttpError(403, "Seller access required"));
    }

    try {
      const sellerHasStore = await storeService.findOneByCondition({
        ownerOfStore: req.user.id,
      });

      if (!sellerHasStore) {
        return next(createHttpError(403, "You must create a store before adding products."));
      }

      const store = await storeService.findOneByCondition({
        _id: req.body.id,
      });

      if (!store) {
        return next(createHttpError(404, "Store not found."));
      }

      req.storeOwner = sellerHasStore;
      req.store = store;
      return next();
    } catch (storeError) {
      return next(storeError);
    }
  });
}

module.exports = {
  requireAuth,
  optionalAuth,
  requireSellerHasStore,
  verifyRefreshToken,
};
