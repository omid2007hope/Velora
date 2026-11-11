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

"use client";

import Image from "next/image";
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function CategoryCarousel({ images = [] }) {
  return (
    <div className="w-full rounded-md border-2 border-amber-950">
      <Carousel
        autoplay
        shape="bar"
        className="overflow-hidden rounded-lg shadow-md"
        style={{ height: 400, background: "#f7f3ef" }}
      >
        {images.map((image) => (
          <div key={image.src} className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              loading="lazy"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
