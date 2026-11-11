// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
