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
