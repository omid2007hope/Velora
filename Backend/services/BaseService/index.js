const { createHttpError } = require("../../utils/httpError");
class BaseService {
  constructor(model) {
    this.model = model;
  }

  _active = (data = {}) => ({ ...data, isDeleted: { $ne: true } });

  _buildTree = async (nodes, parentField) =>
    Promise.all(
      nodes.map(async (node) => {
        const children = await this.model.find(this._active({ [parentField]: node._id }));

        return {
          ...node.toObject(),
          child: children.length ? await this._buildTree(children, parentField) : [],
        };
      })
    );

  findAll = async (data = {}) => this.model.find(this._active(data));

  findAllByThisId = async (id, field = "id") => this.model.find(this._active({ [field]: id }));

  findAllWithSort = async (data = {}, sort = {}) => this.model.find(this._active(data)).sort(sort);

  findAllRecursive = async (parentField) => {
    const parent = await this.model.find(this._active({ [parentField]: null }));
    return this._buildTree(parent, parentField);
  };

  findAllRecursiveByCondition = async (data, parentField) => {
    try {
      const parent = await this.model.find(this._active(data));
      return this._buildTree(parent, parentField);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  findAllDeleted = async () => this.model.find({ isDeleted: true });

  findAllWithPagination = async (data, { page = 1, limit = 10, sort }) => {
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const filter = this._active(data);
    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize),
      this.model.countDocuments(filter),
    ]);
    const pages = Math.ceil(total / pageSize);

    return {
      data,
      metaData: { pages, total, currentPage },
    };
  };

  findAllAndPopulate = async (data, populate) =>
    this.model.find(this._active(data)).populate(populate);

  findById = async (id) => this.model.findOne(this._active({ _id: id }));

  findByIdPopulate = async (id, populate) =>
    this.model.findOne(this._active({ _id: id })).populate(populate);

  findOneByCondition = async (data) => this.model.findOne(this._active(data));

  findOneByConditionAndPopulate = async (data, populate) =>
    this.model.findOne(this._active(data)).populate(populate);

  hardDelete = async (data) => this.model.findOneAndDelete(data);

  softDelete = async (data, user) =>
    this.model.findOneAndUpdate(
      data,
      { isDeleted: true, deletedBy: user, deletedAt: new Date() },
      { returnDocument: "after" }
    );

  softDeleteRecursive = async (parentField, data, user) => {
    const parent = await this.model.findOneAndUpdate(
      data,
      { isDeleted: true, deletedBy: user },
      { returnDocument: "after" }
    );

    if (!parent) {
      throw createHttpError(404, "Resource not found");
    }

    const getChildren = async (parentId) => {
      const children = await this.model.find({ [parentField]: parentId });
      return Promise.all(
        children.map(async (child) => {
          await this.model.findByIdAndUpdate(child._id, {
            isDeleted: true,
            deletedBy: user,
          });

          return {
            ...child.toObject(),
            child: await getChildren(child._id),
          };
        })
      );
    };

    return getChildren(parent._id);
  };

  hardDeleteMany = async (data) => this.model.deleteMany(data);

  update = async (data, payload, returnNew = true) =>
    this.model.findOneAndUpdate(data, payload, {
      returnDocument: returnNew ? "after" : "before",
    });

  updateBySoftDelete = async (data, payload, deletedBy) => {
    await this.model.findOneAndUpdate(data, {
      isDeleted: true,
      deletedBy,
    });
    return this.createObject(payload);
  };

  updateAll = async (data, payload) => this.model.updateMany(data, payload);

  restoreSoftDelete = async (data) =>
    this.model.findOneAndUpdate(
      data,
      { isDeleted: false, deletedBy: "" },
      { returnDocument: "after" }
    );

  createObject = async (data) => {
    const obj = new this.model(data);
    return obj.save();
  };
}

module.exports = BaseService;
