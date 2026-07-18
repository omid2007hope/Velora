const { createHttpError } = require("../../../utils/httpError");
const requireAuth = require("../token/authorization/Mandatory");

function requireCustomer(req, _res, next) {
  return requireAuth(req, _res, (error) => {
    if (error) {
      return next(error);
    }

    if (req.user?.role !== "customer") {
      return next(createHttpError(403, "Customer access required"));
    }

    return next();
  });
}

module.exports = requireCustomer;
