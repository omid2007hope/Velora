const asyncHandler = require("../utils/asyncHandler");
const paymentService = require("../services/PaymentService");
const getAuthorizedUserId = require("../utils/getAuthorizedUserId");

const createPaymentMethod = asyncHandler(async (req, res) => {
  const result = await paymentService.savePaymentMethod({
    userId: getAuthorizedUserId(req),
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
