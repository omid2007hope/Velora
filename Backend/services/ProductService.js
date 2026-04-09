const Product = require("../model/Products");

async function listProducts({ category, subCategory, isNew, search }) {
  const filter = { isDeleted: { $ne: true } };

  if (category) {
    filter.category = category;
  }

  if (subCategory) {
    filter.subCategory = subCategory;
  }

  if (isNew === true) {
    filter.NewArrivals = true;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  return Product.find(filter).sort({ createdAt: -1 });
}

async function getProductById(id) {
  return Product.findById(id);
}

async function createProduct(payload) {
  const normalizedPayload = {
    ...payload,
    subCategory:
      typeof payload.subCategory === "string" && payload.subCategory.trim()
        ? payload.subCategory.trim()
        : String(payload.category).trim(),
  };

  const product = new Product(normalizedPayload);
  return product.save();
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
};
