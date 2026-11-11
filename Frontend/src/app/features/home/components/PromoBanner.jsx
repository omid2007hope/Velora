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
import Accessories from "@/app/assets/image/Accessories.webp";
import Banner from "@/app/assets/image/Banner.webp";
import Men from "@/app/assets/image/Men.webp";
import Watch from "@/app/assets/image/Watch.webp";

export default function PromoBanner() {
  return (
    <div className="h-auto w-full rounded-md border-2 border-amber-950 object-cover lg:w-full">
      <Carousel
        autoplay
        shape="bar"
        className="overflow-hidden rounded-lg shadow-md"
        style={{ height: 440, background: "#f7f3ef" }}
      >
        <div className="relative h-full w-full">
          <Image
            src={Banner}
            alt="Velora summer collection banner"
            fill
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src={Men}
            alt="Men's collection preview"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src={Accessories}
            alt="Accessories collection preview"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src={Watch}
            alt="Watch collection preview"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
}
