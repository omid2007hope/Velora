/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const orderService = require("../services/OrderService");
const paymentIntentService = require("../services/PaymentIntentService");

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder({
    userId: req.user.id,
    items: req.body.items,
    currency: req.body.currency,
    addressSnapshot: req.body.addressSnapshot,
  });

  let paymentIntent;

  try {
    paymentIntent = await paymentIntentService.createPaymentIntentForOrder({
      orderId: order._id,
      amount: order.total,
      currency: order.currency,
    });
  } catch (error) {
    await orderService.hardDelete({ _id: order._id });
    throw error;
  }

  return res.status(201).json({
    _id: order?._id,
    data: order,
    paymentIntent,
  });
});

const listOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listOrdersByUser({
    userId: req.user.id,
  });

  return res.status(200).json({ data: orders });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const updatedOrder = await orderService.updateOrderStatus(req.params.id, {
    userId: req.user.id,
    orderStatus: req.body.orderStatus,
  });

  if (!updatedOrder) {
    throw createHttpError(404, "Order not found");
  }

  return res.status(200).json({ data: updatedOrder });
});

module.exports = {
  createOrder,
  listOrders,
  updateOrderStatus,
};
