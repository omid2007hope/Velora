const { createHttpError } = require("../../../utils/httpError");
const storeService = require("../../../services/StoreService");

const requireAuth = require("../token/authorization/Mandatory");

async function runStoreChecks(req, next) {
  if (req.user?.role !== "seller") {
    return next(createHttpError(403, "Seller access required"));
  }

  const storeId = req.params?.id || req.body?.storeId;

  if (!storeId) {
    return next(createHttpError(400, "Store ID is required"));
  }

  const store = await storeService.findOneByCondition({
    _id: storeId,
    ownerOfStore: req.user.id,
  });

  if (!store) {
    return next(createHttpError(403, "Store not found or you do not have access to it."));
  }

  req.store = store;
  return next();
}

function requireSellerHasStore(req, _res, next) {
  if (req.user) {
    return runStoreChecks(req, next).catch((storeError) => next(storeError));
  }

  return requireAuth(req, _res, (error) => {
    if (error) {
      return next(error);
    }

    return runStoreChecks(req, next).catch((storeError) => next(storeError));
  });
}

module.exports = requireSellerHasStore;
