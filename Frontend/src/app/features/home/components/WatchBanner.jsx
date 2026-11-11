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

// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

import Image from "next/image";
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Watch from "@/app/assets/image/Watch.webp";

const WATCH_IMAGES = [
  {
    src: Watch,
    alt: "Velora watch collection hero",
    priority: true,
  },
  {
    src: "https://images.augustman.com/wp-content/uploads/sites/2/2022/10/27044039/gold-watch-for-men.jpg",
    alt: "Gold men's wristwatch",
  },
  {
    src: "https://i.pinimg.com/originals/14/32/6f/14326fd9259d826653ef8b29e8a41c23.jpg",
    alt: "Luxury wristwatch close-up",
  },
];

export default function WatchBanner() {
  return (
    <div className="flex items-center justify-center h-full w-full object-cover">
      <Carousel
        autoplay
        shape="bar"
        className="w-full h-full overflow-hidden shadow-md"
        style={{ height: 440, background: "#f7f3ef" }}
      >
        {WATCH_IMAGES.map((image) => (
          <div key={image.alt} className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              priority={image.priority ?? false}
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
