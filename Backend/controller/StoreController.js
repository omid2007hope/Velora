const storeService = require("../services/StoreService");
const asyncHandler = require("../utils/asyncHandler");

const createStore = asyncHandler(async (req, res) => {
  const result = await storeService.createAnStore({
    ...req.body,
    ownerOfStore: req.user.id,
  });

  return res.status(201).json(result);
});

module.exports = {
  createStore,
};
