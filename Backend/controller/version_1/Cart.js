// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const cartService = require("../../service/version_1/Cart");
const { isValidObjectId } = require("../../utils/validators");

async function getCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const cart = await cartService.getOrCreate({ userId });
    return res.status(200).json({ data: cart });
  } catch (error) {
    console.error("getCart error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function addItem(req, res) {
  try {
    const userId = req.user?.id;
    const item = req.body;
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updated = await cartService.upsertItem({ userId, item });
    return res.status(201).json({ data: updated });
  } catch (error) {
    console.error("addItem error:", error.message);
    if (error?.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateQuantity(req, res) {
  try {
    const userId = req.user?.id;
    const { itemId, quantity } = req.body || {};
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updated = await cartService.updateQuantity({
      userId,
      itemId,
      quantity,
    });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("updateQuantity error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function removeItem(req, res) {
  try {
    const userId = req.user?.id;
    const { itemId } = req.body || {};
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updated = await cartService.removeItem({ userId, itemId });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("removeItem error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function clearCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const cleared = await cartService.clear({ userId });
    return res.status(200).json({ data: cleared });
  } catch (error) {
    console.error("clearCart error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
};


