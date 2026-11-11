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

export default function CartSummary({ pricing, title = "Order Summary" }) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold text-amber-950">{title}</h2>

      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Subtotal</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Shipping</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.shipping.toFixed(2)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Tax</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.tax.toFixed(2)}
          </dd>
        </div>

        <div className="mt-4 flex justify-between border-t border-amber-900 pt-4">
          <dt className="text-base font-semibold text-amber-950">Order total</dt>
          <dd className="text-base font-semibold text-amber-950">
            ${pricing.total.toFixed(2)}
          </dd>
        </div>
      </dl>
    </>
  );
}
