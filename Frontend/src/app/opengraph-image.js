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

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Velora";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #451a03 0%, #78350f 50%, #fed7aa 100%)",
          color: "#fff7ed",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            opacity: 0.82,
          }}
        >
          Velora
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Contemporary fashion with a sharper silhouette.
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 760,
              fontSize: 28,
              lineHeight: 1.35,
              opacity: 0.92,
            }}
          >
            Clothing, watches, and accessories curated for daily wear.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
