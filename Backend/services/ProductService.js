const Product = require("../model/Product");
const { createHttpError } = require("../utils/httpError");
const BaseService = require("./BaseService");

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = new (class ProductService extends BaseService {
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
        filter.name = { $regex: normalizedSearch, $options: "i" };
      }
    }

    return this.model.find(filter).sort({ createdAt: -1 });
  }

  async listProductsByStoreId(storeId) {
    return this.findAllByThisId(storeId, "storeId");
  }

  async createProduct(payload) {
    if (!payload.storeId) {
      throw createHttpError(400, "StoreId is required");
    }

    const normalizedPayload = {
      storeId: payload.storeId,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      oldPrice: payload.oldPrice || null,
      newPrice: payload.newPrice || null,
      discount: payload.discount || null,
      category: payload.category,
      subCategory:
        typeof payload.subCategory === "string" && payload.subCategory.trim()
          ? payload.subCategory.trim()
          : String(payload.category).trim(),
      imageUrl: payload.imageUrl || null,
      image: payload.image || null,
      NewArrivals: payload.NewArrivals,
      color: payload.color,
      size: payload.size,
      highlights: payload.highlights,
      details: payload.details,
    };

    return this.createObject(normalizedPayload);
  }

  async patchProductByid(productId, payload) {
    const normalizedPayload = {
      name: payload.name,
      description: payload.description || "",
      price: payload.price,
      oldPrice: payload.oldPrice || null,
      newPrice: payload.newPrice || null,
      discount: payload.discount || null,
      category: payload.category,
      subCategory: payload.subCategory,
      imageUrl: payload.imageUrl,
      NewArrivals: payload.NewArrivals || null,
      color: payload.color || null,
      size: payload.size || null,
      highlights: payload.highlights || null,
      reviews: payload.reviews || null,
    };

    const updated = await this.update(
      { _id: productId, storeOwnerId: payload.storeOwnerId },
      normalizedPayload
    );

    if (!updated) {
      throw createHttpError(404, "Product not found");
    }

    return updated;
  }

  async deleteProductById(productId, ownerId) {
    const existingProduct = await this.findOneByCondition({
      _id: productId,
    });

    if (!existingProduct) {
      throw createHttpError(404, "Product not found");
    }

    return this.softDelete({ _id: productId }, ownerId);
  }
})(Product);
