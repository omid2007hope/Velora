// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";
import Image from "next/image";
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Watch from "../../assets/image/Watch.webp";

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

export default function WatchCarousel() {
  return (
    <div className="h-full w-full object-cover">
      <Carousel
        autoplay
        shape="bar"
        className="overflow-hidden rounded-lg shadow-md"
        style={{
          height: 400,
          background: "#f7f3ef",
        }}
      >
        {WATCH_IMAGES.map((image) => (
          <div key={image.alt} className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              priority={image.priority ?? false}
              className="object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
