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
