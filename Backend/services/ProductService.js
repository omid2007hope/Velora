/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

const Product = require('../model/Product');
const Store = require('../model/Store');
const { createHttpError } = require('../utils/httpError');
const BaseService = require('./BaseService');

function escapeRegex(value) {
	return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = new (class ProductService extends BaseService {
	// ! Gets

	// ! Ok
	async listProducts({ category, subCategory, isNew, search, storeId }) {
		const filter = { isDeleted: { $ne: true } };

		if (storeId) {
			filter.storeId = storeId;
		}

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
			const normalizedSearch = escapeRegex(String(search).trim().slice(0, 100));

			if (normalizedSearch) {
				filter.name = { $regex: normalizedSearch, $options: 'i' };
			}
		}

		return this.model.find(filter).sort({ createdAt: -1 });
	}

	// ! Ok

	async listProductsByStoreId(storeId) {
		return this.findAllByThisId(storeId, 'storeId');
	}

	// ! Ok

	async getProductById(id) {
		return this.findById(id);
	}

	async _verifyStoreOwnership(targetStoreId, sellerStoreId, sellerId) {
		if (sellerStoreId && String(targetStoreId) === String(sellerStoreId)) {
			return true;
		}

		if (sellerId) {
			const store = await Store.findOne({
				_id: targetStoreId,
				ownerOfStore: sellerId,
			});

			if (store) {
				return true;
			}
		}

		throw createHttpError(403, 'Forbidden: store ownership required');
	}

	// ! post

	async createProduct(payload, sellerStoreId, sellerId) {
		if (!payload.storeId) {
			throw createHttpError(400, 'StoreId is required');
		}

		await this._verifyStoreOwnership(payload.storeId, sellerStoreId, sellerId);

		const normalizedPayload = {
			storeId: payload.storeId,
			name: payload.name,
			description: payload.description,
			price: payload?.newPrice ? payload?.newPrice : payload?.oldPrice,
			oldPrice: payload.oldPrice,
			newPrice: payload?.newPrice || null,
			discount: payload.discount || null,
			category: payload.category,
			subCategory: payload.subCategory?.trim(),
			imageUrl: payload.imageUrl,
			image: payload.imageUrl ? payload.imageUrl : payload.image,
			NewArrivals: payload.NewArrivals,
			color: payload.color,
			size: payload.size,
			highlights: payload.highlights,
			details: payload.details,
		};

		return this.createObject(normalizedPayload);
	}

	async patchProductByid(productId, payload, sellerStoreId, sellerId) {
		if (!productId) {
			throw createHttpError(400, "Product's ID is required");
		}

		const existingProduct = await this.findOneByCondition({
			_id: productId,
		});

		if (!existingProduct) {
			throw createHttpError(404, 'Product not found');
		}

		await this._verifyStoreOwnership(existingProduct.storeId, sellerStoreId, sellerId);

		if (payload?.storeId && String(payload.storeId) !== String(existingProduct.storeId)) {
			await this._verifyStoreOwnership(payload.storeId, sellerStoreId, sellerId);
		}

		const normalizedPayload = {
			name: payload?.name,
			description: payload?.description,
			price: payload?.newPrice ? payload?.newPrice : payload?.oldPrice,
			oldPrice: payload?.oldPrice,
			newPrice: payload?.newPrice,
			discount: payload?.discount,
			category: payload?.category,
			subCategory: payload?.subCategory?.trim(),
			imageUrl: payload?.imageUrl,
			image: payload?.imageUrl ? payload?.imageUrl : payload?.image,
			NewArrivals: payload?.NewArrivals,
			color: payload?.color,
			size: payload?.size,
			highlights: payload?.highlights,
			details: payload?.details,
		};

		const updated = await this.update({ _id: productId }, normalizedPayload);

		if (!updated) {
			throw createHttpError(404, 'Product not found');
		}

		return updated;
	}

	async deleteProductById(productId, sellerStoreId, sellerId) {
		const existingProduct = await this.findOneByCondition({
			_id: productId,
		});

		if (!existingProduct) {
			throw createHttpError(404, 'Product not found');
		}

		await this._verifyStoreOwnership(existingProduct.storeId, sellerStoreId, sellerId);

		return this.softDelete({ _id: productId }, sellerId);
	}
})(Product);
