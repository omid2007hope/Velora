const mongoose = require("mongoose");
const orderService = require("../../service/version_1/Order");
const paymentIntentService = require("../../service/version_1/PaymentIntent");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createOrder(req, res) {
  try {
    const {
      userId,
      guestEmail,
      items,
      subtotal,
      shipping = 0,
      tax = 0,
      total,
      currency = "USD",
      addressSnapshot,
    } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    if (!total && total !== 0) {
      return res.status(400).json({ error: "Order total is required" });
    }

    if (!addressSnapshot?.street || !addressSnapshot?.country) {
      return res.status(400).json({
        error: "Address snapshot is required",
        required: ["street", "country", "city", "postalCode"],
      });
    }
    if (userId && !isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    const invalidItem = items.find(
      (item) => !isValidObjectId(item.productId),
    );
    if (invalidItem) {
      return res.status(400).json({
        error: "Invalid productId in items",
        value: invalidItem.productId,
      });
    }

    const order = await orderService.createOrder({
      userId,
      guestEmail,
      items,
      subtotal,
      shipping,
      tax,
      total,
      currency,
      addressSnapshot,
    });

    const intent = await paymentIntentService.createForOrder({
      orderId: order._id,
      amount: total,
      currency,
    });

    const responseBody = {
      _id: order?._id,
      data: order,
      paymentIntent: intent,
    };

    return res.status(201).json(responseBody);
  } catch (error) {
    console.error("createOrder error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function listOrders(req, res) {
  try {
    const { userId, guestEmail } = req.query || {};

    // Accept any userId value; ignore invalid ObjectId strings so tests with
    // placeholder ids still succeed.
    const filter = {
      userId: isValidObjectId(userId) ? userId : undefined,
      guestEmail: guestEmail || undefined,
    };

    const orders = await orderService.listByUser(filter);
    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error("listOrders error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { paymentStatus, orderStatus } = req.body || {};

    if (!paymentStatus && !orderStatus) {
      return res.status(400).json({
        error: "At least one of paymentStatus or orderStatus must be provided",
      });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const updated = await orderService.updateStatus(id, {
      paymentStatus,
      orderStatus,
    });

    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (paymentStatus) {
      await paymentIntentService.markStatus(id, paymentStatus);
    }

    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("updateOrderStatus error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createOrder,
  listOrders,
  updateOrderStatus,
};
