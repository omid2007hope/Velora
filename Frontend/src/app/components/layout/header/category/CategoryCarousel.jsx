"use client";

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
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
}
