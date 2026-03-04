// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const orderService = require("../../service/version_1/Order");
const paymentIntentService = require("../../service/version_1/PaymentIntent");
const { isValidObjectId } = require("../../utils/validators");

async function createOrder(req, res) {
  try {
    const userId = req.user?.id;
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      items,
      shipping = 0,
      tax = 0,
      currency = "USD",
      addressSnapshot,
    } = req.body || {};

    const order = await orderService.createOrder({
      userId,
      items,
      shipping,
      tax,
      currency,
      addressSnapshot,
    });

    const intent = await paymentIntentService.createForOrder({
      orderId: order._id,
      amount: order.total,
      currency: order.currency,
    });

    const responseBody = {
      _id: order?._id,
      data: order,
      paymentIntent: intent,
    };

    return res.status(201).json(responseBody);
  } catch (error) {
    console.error("createOrder error:", error.message);
    return res
      .status(error.status || 500)
      .json({ error: error.status ? error.message : "Internal server error" });
  }
}

async function listOrders(req, res) {
  try {
    const userId = req.user?.id;
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const filter = {
      userId,
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
    const userId = req.user?.id;

    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!paymentStatus && !orderStatus) {
      return res.status(400).json({
        error: "At least one of paymentStatus or orderStatus must be provided",
      });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const updated = await orderService.updateStatus(id, {
      userId,
      paymentStatus,
      orderStatus,
    });

    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (paymentStatus) {
      const intentStatusMap = {
        paid: "succeeded",
        failed: "failed",
        requires_action: "requires_action",
      };
      const intentStatus = intentStatusMap[paymentStatus] || paymentStatus;
      await paymentIntentService.markStatus(id, intentStatus);
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


