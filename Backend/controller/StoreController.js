import storeService from "../services/StoreService";

async function createStore(req, res) {
  const result = await storeService.mapStoreDetail(req.body);

  return res.status(201).json({
    _id: result?.data?._id,
    ...result,
  });
}
