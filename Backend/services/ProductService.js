const Product = require("../model/Product");
const BaseService = require("./BaseService");

module.exports = new (class ProductService extends BaseService {
  async listProducts({ category, subCategory, isNew, search }) {
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

    return this.model.find(filter).sort({ createdAt: -1 });
  }

  async listSellerProducts(storeOwnerId) {
    return this.model.find({ storeOwnerId }).sort({ createdAt: -1 });
  }

  async getProductById(id) {
    return this.findById(id);
  }

  async createProduct(payload, options = {}) {
    const normalizedPayload = {
      ...payload,
      storeOwnerId: options.storeOwnerId,
      subCategory:
        typeof payload.subCategory === "string" && payload.subCategory.trim()
          ? payload.subCategory.trim()
          : String(payload.category).trim(),
    };

    return this.createObject(normalizedPayload);
  }
})(Product);
