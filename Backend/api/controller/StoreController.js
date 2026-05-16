const storeService = require("../services/StoreService");
const asyncHandler = require("../utils/asyncHandler");

const createStore = asyncHandler(async (req, res) => {
  const result = await storeService.createAnStore({
    ...req.body,
    ownerOfStore: req.user.id,
  });

  return res.status(201).json({ data: result });
});

const patchStoreData = asyncHandler(async (req, res) => {
  const result = await storeService.patchStoreData(req.params.id, {
    ...req.body,
    ownerOfStore: req.user.id,
  });

  return res.status(200).json({ data: result });
});

const deleteStore = asyncHandler(async (req, res) => {
  const result = await storeService.deleteStore(req.params.id, req.user.id);

  return res.status(200).json({ data: result });
});

const getStoreData = asyncHandler(async (req, res) => {
  const result = await storeService.getStoreData(req.user.id);
  return res.status(200).json({ data: result });
});

module.exports = {
  createStore,
  patchStoreData,
  deleteStore,
  getStoreData,
};
