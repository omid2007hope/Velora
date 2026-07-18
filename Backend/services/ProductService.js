const Product = require("../model/Product");
const { createHttpError } = require("../utils/httpError");
const BaseService = require("./BaseService");

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
        filter.name = { $regex: normalizedSearch, $options: "i" };
      }
    }

    return this.model.find(filter).sort({ createdAt: -1 });
  }

  // ! Ok

  async listProductsByStoreId(storeId) {
    return this.findAllByThisId(storeId, "storeId");
  }

  // ! Ok

  async getProductById(id) {
    return this.findById(id);
  }

  // ! post

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

  async patchProductByid(productId, payload) {
    if (!productId) {
      throw createHttpError(400, "Product's ID is required");
    }

    const normalizedPayload = {
      name: payload?.name,
      description: payload?.description,
      price: payload?.price,
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
