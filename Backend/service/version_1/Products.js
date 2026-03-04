const model = require("../../model/Products");
const BaseService = require("../BaseService");

module.exports = new (class Products extends BaseService {
  async list({ category, isNew, search }) {
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (isNew === true) {
      filter.NewArrivals = true;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    return this.findAllWithSort(filter, { createdAt: -1 });
  }

  async getById(id) {
    return this.findById(id);
  }
})(model);
