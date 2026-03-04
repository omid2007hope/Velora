const mongoose = require("mongoose");
const cartService = require("../../service/version_1/Cart");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function resolveActor(req) {
  const fromBody = req.body || {};
  const fromQuery = req.query || {};
  const headerSession = req.headers?.["x-session-id"];
  // Fall back to the client IP so anonymous calls still get a stable cart key.
  const fallbackSession = req.ip || req.connection?.remoteAddress || null;

  const userId = fromBody.userId || fromQuery.userId || null;
  const sessionId =
    fromBody.sessionId ||
    fromQuery.sessionId ||
    headerSession ||
    fallbackSession ||
    null;

  return { userId, sessionId };
}

async function getCart(req, res) {
  try {
    const actor = resolveActor(req);
    if (actor.userId && !isValidObjectId(actor.userId)) {
      return res.status(400).json({ error: "Invalid userId" });
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
    if (actor.userId && !isValidObjectId(actor.userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    if (!item?.productId || !item?.priceSnapshot?.newPrice) {
      return res.status(400).json({
        error: "Missing required item fields",
        required: ["item.productId", "item.priceSnapshot.newPrice"],
      });
    }
    if (!isValidObjectId(item.productId)) {
      return res
        .status(400)
        .json({ error: "Invalid productId", value: item.productId });
    }

    const updated = await cartService.upsertItem({ ...actor, item });
    return res.status(201).json({ data: updated });
  } catch (error) {
    console.error("addItem error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateQuantity(req, res) {
  try {
    const actor = resolveActor(req);
    const { itemId, quantity } = req.body || {};
    if (actor.userId && !isValidObjectId(actor.userId)) {
      return res.status(400).json({ error: "Invalid userId" });
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
    if (actor.userId && !isValidObjectId(actor.userId)) {
      return res.status(400).json({ error: "Invalid userId" });
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
