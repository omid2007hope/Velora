const { createHttpError } = require("../../../utils/httpError");
const requireAuth = require("../token/authorization/Mandatory");

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

module.exports = requireSeller;
