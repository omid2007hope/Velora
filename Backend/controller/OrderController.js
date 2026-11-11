// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
