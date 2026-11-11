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

export const SHIPPING_FEE = 5;
export const TAX_AMOUNT = 0;

export function calculateOrderPricing(items = []) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.newPrice ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  const shipping = items.length ? SHIPPING_FEE : 0;
  const tax = TAX_AMOUNT;
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
}
