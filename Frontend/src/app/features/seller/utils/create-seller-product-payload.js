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

function toOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function createSellerProductPayload(form, storeId) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    category: form.category.trim(),
    subCategory: form.subCategory.trim() || undefined,
    price: Number(form.price),
    oldPrice: toOptionalNumber(form.oldPrice),
    newPrice: toOptionalNumber(form.newPrice),
    imageUrl: form.imageUrl.trim(),
    storeId: storeId || undefined,
  };
}
