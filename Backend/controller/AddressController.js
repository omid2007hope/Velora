const asyncHandler = require("../utils/asyncHandler");
const addressService = require("../services/AddressService");
const { createHttpError } = require("../utils/httpError");

const createAddress = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(401, "Unauthorized");
  }

  const result = await addressService.createAddress({
    userId,
    country: req.body.country,
    city: req.body.city,
    street: req.body.street,
    postalCode: req.body.postalCode,
  });

  return res.status(result.existed ? 200 : 201).json({
    _id: result?.data?._id,
    ...result,
  });
});

module.exports = {
  createAddress,
};
