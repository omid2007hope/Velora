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

"use client";

import { useCallback } from "react";
import { listSellerStore } from "@/app/features/seller/services/seller-store-service";
import { useHandleApi } from "@/app/lib/function";

export function useSellerStores() {
  const apiFn = useCallback(() => listSellerStore(), []);
  const { dataList: stores, loading, error, setDataList: setStores } = useHandleApi(apiFn);

  return {
    stores,
    loading,
    error,
    setStores,
  };
}
