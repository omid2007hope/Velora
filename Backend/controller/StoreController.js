const storeService = require("../services/StoreService");
const asyncHandler = require("../utils/asyncHandler");

const createStore = asyncHandler(async (req, res) => {
  const result = await storeService.createAnStore({
    ...req.body,
    ownerOfStore: req.user.id,
  });

  return res.status(201).json(result);
});

const getStoreData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await storeService.getStoreData(id);
  return res.status(200).json(result);
});

module.exports = {
  createStore,
  getStoreData,
};
