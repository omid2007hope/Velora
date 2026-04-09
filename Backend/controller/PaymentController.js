const asyncHandler = require("../utils/asyncHandler");
const paymentService = require("../services/PaymentService");
const { createHttpError } = require("../utils/httpError");

const createPaymentMethod = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(401, "Unauthorized");
  }

  const result = await paymentService.savePaymentMethod({
    userId,
    paymentMethodId: req.body.paymentMethodId,
    billingName: req.body.billingName,
  });

  return res.status(result.existed ? 200 : 201).json({
    _id: result?.data?._id,
    ...result,
  });
});

module.exports = {
  createPaymentMethod,
};
