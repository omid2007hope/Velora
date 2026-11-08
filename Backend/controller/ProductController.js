const asyncHandler = require('../utils/asyncHandler');
const { createHttpError } = require('../utils/httpError');
const productService = require('../services/ProductService');

const listProducts = asyncHandler(async (req, res) => {
	const { category, subCategory, new: isNew, search, storeId } = req.query;
	const products = await productService.listProducts({
		category,
		subCategory,
		isNew: String(isNew).toLowerCase() === 'true' || isNew === '1',
		search,
		storeId,
	});

	return res.status(200).json({ data: products });
});

const listProductsByStoreId = asyncHandler(async (req, res) => {
	const storeId = req.params.id;

	const result = await productService.listProductsByStoreId(storeId);
	return res.status(200).json({ data: result });
});

const getProductById = asyncHandler(async (req, res) => {
	const productId = req.params.id;
	const result = await productService.getProductById(productId);
	return res.status(200).json({ data: result });
});

const createProduct = asyncHandler(async (req, res) => {
	const body = req.body;
	const sellerStoreId = req.seller?.storeId;
	const sellerId = req.user?.id;

	const createdProduct = await productService.createProduct(body, sellerStoreId, sellerId);
	return res.status(201).json({ data: createdProduct });
});

const patchProductByid = asyncHandler(async (req, res) => {
	const productId = req.params.id;
	const sellerStoreId = req.seller?.storeId;
	const sellerId = req.user?.id;
	const data = req.body;

	const result = await productService.patchProductByid(productId, data, sellerStoreId, sellerId);

	if (!result) {
		throw createHttpError(404, 'Product not found');
	}

	return res.status(200).json({ data: result });
});

const deleteProductById = asyncHandler(async (req, res) => {
	const productId = req.params.id;
	const sellerStoreId = req.seller?.storeId;
	const sellerId = req.user?.id;

	const result = await productService.deleteProductById(productId, sellerStoreId, sellerId);

	if (!result) {
		throw createHttpError(404, 'Product not found');
	}

	return res.status(200).json({ data: result });
});

module.exports = {
	listProductsByStoreId,
	listProducts,
	createProduct,
	patchProductByid,
	deleteProductById,
	getProductById,
};
