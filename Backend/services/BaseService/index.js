const { createHttpError } = require("../../utils/httpError");
class BaseService {
  constructor(model) {
    this.model = model;
  }

  _active = (filter = {}) => ({ ...filter, isDeleted: { $ne: true } });

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

  findAll = async (filter = {}) => this.model.find(this._active(filter));

  findAllByThisId = async (id, field = "id") => this.model.find(this._active({ [field]: id }));

  findAllWithSort = async (filter = {}, sort = {}) =>
    this.model.find(this._active(filter)).sort(sort);

  findAllRecursive = async (parentField) => {
    const parent = await this.model.find(this._active({ [parentField]: null }));
    return this._buildTree(parent, parentField);
  };

  findAllRecursiveByCondition = async (filter, parentField) => {
    try {
      const parent = await this.model.find(this._active(filter));
      return this._buildTree(parent, parentField);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  findAllDeleted = async () => this.model.find({ isDeleted: true });

  findAllWithPagination = async (filter, { page = 1, limit = 10, sort }) => {
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const activeFilter = this._active(filter);
    const [data, total] = await Promise.all([
      this.model
        .find(activeFilter)
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

  findAllAndPopulate = async (filter, populate) =>
    this.model.find(this._active(filter)).populate(populate);

  findById = async (id) => this.model.findOne(this._active({ _id: id }));

  findByIdPopulate = async (id, populate) =>
    this.model.findOne(this._active({ _id: id })).populate(populate);

  findOneByCondition = async (filter) => this.model.findOne(this._active(filter));

  findOneByConditionAndPopulate = async (filter, populate) =>
    this.model.findOne(this._active(filter)).populate(populate);

  hardDelete = async (filter) => this.model.findOneAndDelete(filter);

  softDelete = async (filter, user) =>
    this.model.findOneAndUpdate(
      filter,
      { isDeleted: true, deletedBy: user, deletedAt: new Date() },
      { returnDocument: "after" }
    );

  softDeleteRecursive = async (parentField, filter, user) => {
    const parent = await this.model.findOneAndUpdate(
      filter,
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

  hardDeleteMany = async (filter) => this.model.deleteMany(filter);

  update = async (filter, updateData, returnNew = true) =>
    this.model.findOneAndUpdate(filter, updateData, {
      returnDocument: returnNew ? "after" : "before",
    });

  updateBySoftDelete = async (filter, updateData, deletedBy) => {
    await this.model.findOneAndUpdate(filter, {
      isDeleted: true,
      deletedBy,
    });
    return this.createObject(updateData);
  };

  updateAll = async (filter, updateData) => this.model.updateMany(filter, updateData);

  restoreSoftDelete = async (filter) =>
    this.model.findOneAndUpdate(
      filter,
      { isDeleted: false, deletedBy: "" },
      { returnDocument: "after" }
    );

  createObject = async (documentData) => {
    const obj = new this.model(documentData);
    return obj.save();
  };
}

module.exports = BaseService;
