const asyncHandler = require("../utils/asyncHandler");
const { createHttpError } = require("../utils/httpError");
const productService = require("../services/ProductService");

const listProducts = asyncHandler(async (req, res) => {
  const { category, subCategory, new: isNew, search, storeId } = req.query;
  const products = await productService.listProducts({
    category,
    subCategory,
    isNew: String(isNew).toLowerCase() === "true" || isNew === "1",
    search,
    storeId,
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
  const createdProduct = await productService.createProduct(req.body, {
    storeOwnerId: req.user.id,
    storeId: req.store._id,
  });
  return res.status(201).json({ data: createdProduct });
});

const patchProductByid = asyncHandler(async (req, res) => {
  const result = await productService.patchProductByid(req.params.id, {
    ...req.body,
    storeOwnerId: req.user.id,
  });

  if (!result) {
    throw createHttpError(404, "Product not found");
  }

  return res.status(200).json({ data: result });
});

const deleteProductById = asyncHandler(async (req, res) => {
  const result = await productService.deleteProductById(req.params.id, req.user.id);

  if (!result) {
    throw createHttpError(404, "Product not found");
  }

  return res.status(200).json({ data: result });
});

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  patchProductByid,
  deleteProductById,
};
