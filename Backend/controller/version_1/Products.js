const productService = require("../../service/version_1/Products");

async function listProducts(req, res) {
  try {
    const { category, new: isNew, search } = req.query;
    const products = await productService.list({
      category,
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

module.exports = {
  listProducts,
  getProduct,
};
