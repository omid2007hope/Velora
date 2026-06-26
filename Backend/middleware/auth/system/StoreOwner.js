const jwt = require("jsonwebtoken");
const { createHttpError } = require("../../../utils/httpError");
const storeService = require("../../../services/StoreService");

const requireAuth = require("../token/authorization/Mandatory");

function requireSellerHasStore(req, _res, next) {
  return requireAuth(req, _res, async (error) => {
    if (error) {
      return next(error);
    }

    if (req.user?.role !== "seller") {
      return next(createHttpError(403, "Seller access required"));
    }

    try {
      const store = await storeService.findOneByCondition({
        _id: req.body.storeId,
        ownerOfStore: req.user.id,
      });

      if (!store) {
        return next(createHttpError(403, "Store not found or you do not have access to it."));
      }

      req.store = store;
      return next();
    } catch (storeError) {
      return next(storeError);
    }
  });
}

module.exports = requireSellerHasStore;
