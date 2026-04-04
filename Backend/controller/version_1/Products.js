// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const productService = require("../../service/version_1/Products");

async function listProducts(req, res) {
  try {
    const { category, subCategory, new: isNew, search } = req.query;
    const products = await productService.list({
      category,
      subCategory,
      isNew: String(isNew).toLowerCase() === "true" || isNew === "1",
      search,
    });
    return res.status(200).json({ data: products });
  } catch (error) {
    console.error("listProducts error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ data: product });
  } catch (error) {
    console.error("getProduct error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function createProduct(req, res) {
  try {
    const payload = req.body || {};
    const required = ["name", "description", "price", "category", "imageUrl"];
    const missing = required.filter((field) => !payload[field]);
    if (missing.length) {
      return res
        .status(400)
        .json({ error: "Missing required fields", missing });
    }

    const created = await productService.create(payload);
    return res.status(201).json({ data: created });
  } catch (error) {
    console.error("createProduct error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
