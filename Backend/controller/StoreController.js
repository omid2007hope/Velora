/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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

const getAllStore = asyncHandler(async (req, res) => {
  const result = await storeService.getAllStores();
  return res.status(200).json({ data: result });
});

const getStoreById = asyncHandler(async (req, res) => {
  const storeId = req.params.id;
  const result = await storeService.getStoreById(storeId);
  return res.status(200).json({ data: result });
});

const listStoreByOwnerId = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const result = await storeService.listStoreByOwnerId(ownerId);
  return res.status(200).json({ data: result });
});

module.exports = {
  listStoreByOwnerId,
  getAllStore,
  getStoreById,
  createStore,
  patchStoreData,
  deleteStore,
};
