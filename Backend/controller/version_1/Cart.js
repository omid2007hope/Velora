const cartService = require("../../service/version_1/Cart");

function resolveActor(req) {
  const { userId, sessionId } = req.body || req.query || {};
  return {
    userId: userId || null,
    sessionId: sessionId || null,
  };
}

async function getCart(req, res) {
  try {
    const actor = resolveActor(req);
    if (!actor.userId && !actor.sessionId) {
      return res
        .status(400)
        .json({ error: "userId or sessionId is required to fetch cart" });
    }
    const cart = await cartService.getOrCreate(actor);
    return res.status(200).json({ data: cart });
  } catch (error) {
    console.error("getCart error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function addItem(req, res) {
  try {
    const actor = resolveActor(req);
    const item = req.body?.item;
    if (!actor.userId && !actor.sessionId) {
      return res
        .status(400)
        .json({ error: "userId or sessionId is required to modify cart" });
    }
    if (!item?.productId || !item?.priceSnapshot?.newPrice) {
      return res.status(400).json({
        error: "Missing required item fields",
        required: ["item.productId", "item.priceSnapshot.newPrice"],
      });
    }

    const updated = await cartService.upsertItem({ ...actor, item });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("addItem error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateQuantity(req, res) {
  try {
    const actor = resolveActor(req);
    const { itemId, quantity } = req.body || {};
    if (!actor.userId && !actor.sessionId) {
      return res
        .status(400)
        .json({ error: "userId or sessionId is required to modify cart" });
    }
    if (!itemId || quantity === undefined) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["itemId", "quantity"],
      });
    }

    const updated = await cartService.updateQuantity({
      ...actor,
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
    const actor = resolveActor(req);
    const { itemId } = req.body || {};
    if (!actor.userId && !actor.sessionId) {
      return res
        .status(400)
        .json({ error: "userId or sessionId is required to modify cart" });
    }
    if (!itemId) {
      return res.status(400).json({ error: "itemId is required" });
    }

    const updated = await cartService.removeItem({ ...actor, itemId });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("removeItem error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function clearCart(req, res) {
  try {
    const actor = resolveActor(req);
    if (!actor.userId && !actor.sessionId) {
      return res
        .status(400)
        .json({ error: "userId or sessionId is required to modify cart" });
    }

    const cleared = await cartService.clear(actor);
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
