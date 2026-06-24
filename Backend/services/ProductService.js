const Product = require("../model/Product");
const Review = require("../model/Review");
const BaseService = require("./BaseService");

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = new (class ProductService extends BaseService {
  async listProducts({ category, subCategory, isNew, search, storeId }) {
    const filter = { isDeleted: { $ne: true }, storeId };

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

  async getProductById(id) {
    return this.findById(id);
  }

  async createProduct(payload, options = {}) {
    const normalizedPayload = {
      ...payload,
      storeOwnerId: options.storeOwnerId,
      storeId: options.storeId,
      subCategory:
        typeof payload.subCategory === "string" && payload.subCategory.trim()
          ? payload.subCategory.trim()
          : String(payload.category).trim(),
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

    return this.update({ _id: productId, storeOwnerId: payload.storeOwnerId }, normalizedPayload);
  }

  async deleteProductById(productId, userId) {
    return this.hardDelete({ _id: productId, storeOwnerId: userId });
  }
})(Product);
