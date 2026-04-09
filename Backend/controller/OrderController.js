const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const { isValidObjectId } = require("../utils/validators");
const orderService = require("../services/OrderService");
const paymentIntentService = require("../services/PaymentIntentService");

function getAuthorizedUserId(req) {
  const userId = req.user?.id;

  if (!isValidObjectId(userId)) {
    throw createHttpError(401, "Unauthorized");
  }

  return userId;
}

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder({
    userId: getAuthorizedUserId(req),
    items: req.body.items,
    shipping: req.body.shipping,
    tax: req.body.tax,
    currency: req.body.currency,
    addressSnapshot: req.body.addressSnapshot,
  });

  const paymentIntent = await paymentIntentService.createPaymentIntentForOrder({
    orderId: order._id,
    amount: order.total,
    currency: order.currency,
  });

  return res.status(201).json({
    _id: order?._id,
    data: order,
    paymentIntent,
  });
});

const listOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listOrdersByUser({
    userId: getAuthorizedUserId(req),
  });

  return res.status(200).json({ data: orders });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const updatedOrder = await orderService.updateOrderStatus(req.params.id, {
    userId: getAuthorizedUserId(req),
    paymentStatus: req.body.paymentStatus,
    orderStatus: req.body.orderStatus,
  });

  if (!updatedOrder) {
    throw createHttpError(404, "Order not found");
  }

  if (req.body.paymentStatus) {
    const intentStatusMap = {
      paid: "succeeded",
      failed: "failed",
      requires_action: "requires_action",
    };

    await paymentIntentService.updatePaymentIntentStatus(
      req.params.id,
      intentStatusMap[req.body.paymentStatus] || req.body.paymentStatus,
    );
  }

  return res.status(200).json({ data: updatedOrder });
});

module.exports = {
  createOrder,
  listOrders,
  updateOrderStatus,
};
