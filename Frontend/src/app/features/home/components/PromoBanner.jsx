// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";

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
        <img
          src={Banner.src}
          alt="Velora summer collection banner"
          width="1234"
          height="690"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-full w-full object-cover"
        />
        <img
          src={Men.src}
          alt="Men's collection preview"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-full w-full object-cover"
        />
        <img
          src={Accessories.src}
          alt="Accessories collection preview"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-full w-full object-cover"
        />
        <img
          src={Watch.src}
          alt="Watch collection preview"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}
