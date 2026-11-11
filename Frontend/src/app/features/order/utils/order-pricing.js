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
