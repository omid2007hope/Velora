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
