import storeService from "../services/StoreService";
import asyncHandler from "../utils/asyncHandler";

const createStore = asyncHandler(async (req, res) => {
  const result = await storeService.mapStoreDetail(req.body);

  return res.status(201).json({
    _id: result?.data?._id,
    ...result,
  });
});
