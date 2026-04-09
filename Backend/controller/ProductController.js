const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const productService = require("../services/ProductService");

const listProducts = asyncHandler(async (req, res) => {
  const { category, subCategory, new: isNew, search } = req.query;
  const products = await productService.listProducts({
    category,
    subCategory,
    isNew: String(isNew).toLowerCase() === "true" || isNew === "1",
    search,
  });

  return res.status(200).json({ data: products });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  return res.status(200).json({ data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const createdProduct = await productService.createProduct(req.body);
  return res.status(201).json({ data: createdProduct });
});

module.exports = {
  listProducts,
  getProductById,
  createProduct,
};
