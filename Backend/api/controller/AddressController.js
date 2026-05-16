const asyncHandler = require("../utils/asyncHandler");
const addressService = require("../services/AddressService");
const getAuthorizedUserId = require("../utils/getAuthorizedUserId");

const createAddress = asyncHandler(async (req, res) => {
  const result = await addressService.createAddress({
    userId: getAuthorizedUserId(req),
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
