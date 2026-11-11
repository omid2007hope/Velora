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

import { ImageResponse } from "next/og";
import { getProductById } from "@/app/lib/server-api";

export const runtime = "edge";
export const alt = "Velora product preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatPrice(product) {
  const price = product?.newPrice ?? product?.price;

  if (!Number.isFinite(Number(price))) {
    return "Discover the latest drop";
  }

  return `$${Number(price).toFixed(2)}`;
}

function truncateOgText(text, max = 120) {
  if (!text) return "";
  const cut = text.slice(0, max);
  return cut.length < text.length
    ? cut.slice(0, cut.lastIndexOf(" ")) || cut
    : cut;
}

export default async function ProductOpenGraphImage({ params }) {
  const result = await getProductById(params?.id).catch(() => ({
    product: null,
  }));
  const product = result.product;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px",
        background:
          "linear-gradient(145deg, #1c1917 0%, #78350f 55%, #fdba74 100%)",
        color: "#fff7ed",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        <span>Velora</span>
        <span style={{ opacity: 0.82 }}>{product?.category || "Product"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            maxWidth: 920,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.04,
          }}
        >
          {product?.name || "Curated style, ready to shop"}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 880,
            fontSize: 28,
            lineHeight: 1.35,
            opacity: 0.92,
          }}
        >
          {product?.description
            ? truncateOgText(product.description)
            : "Browse the latest clothing, watches, and accessories from Velora."}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          {formatPrice(product)}
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid rgba(255, 247, 237, 0.35)",
            borderRadius: 9999,
            padding: "16px 26px",
            fontSize: 24,
          }}
        >
          Velora Store
        </div>
      </div>
    </div>,
    size,
  );
}
