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

import Image from "next/image";
import Link from "next/link";
import { resolveProductImageSrc } from "@/app/lib/product-image";

export default function ProductCard({ product }) {
  const productId = product._id || product.id;
  const image = resolveProductImageSrc(product.imageUrl, product.image);
  const price = product.newPrice ?? product.price;
  const oldPrice = product.oldPrice ?? product.price;

  return (
    <div className="overflow-hidden rounded-xl border-2 border-amber-950 bg-orange-200 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl">
      <Link href={`/products/${productId}`}>
        <div className="relative aspect-[5/3] w-full">
          <Image
            src={image}
            alt={product.name}
            fill
            unoptimized
            loading="lazy"
            sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, 50vw"
            className="object-cover"
          />
          {product.discount ? (
            <span className="absolute left-3 top-3 rounded-md bg-amber-950 px-3 py-1 text-xs font-semibold text-white shadow-md sm:text-sm">
              {product.discount}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex h-[180px] flex-col justify-between p-4 sm:p-5">
        <h3 className="truncate text-base font-semibold text-amber-950 sm:text-lg">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center space-x-3">
          <span className="text-lg font-bold text-amber-950">${price}</span>
          <span className="text-sm text-amber-800 line-through">${oldPrice}</span>
        </div>

        <Link
          href={`/products/${productId}`}
          className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-center text-sm font-semibold text-white shadow transition hover:bg-amber-800"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
