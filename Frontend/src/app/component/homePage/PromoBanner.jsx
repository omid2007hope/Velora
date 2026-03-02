// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Banner from "../../assets/image/Banner.webp";
import Men from "../../assets/image/Men.webp";
import Accessories from "../../assets/image/Accessories.webp";
import Watch from "../../assets/image/Watch.webp";

export default function PromoCarousel() {
  return (
    <div className="w-full h-auto lg:w-full rounded-md object-cover border-2 border-amber-950">
      <Carousel
        autoplay
        shape="bar"
        className="rounded-lg shadow-md overflow-hidden"
        style={{
          height: 400,
          background: "#f7f3ef",
        }}
      >
        <img
          src={Banner.src}
          alt="Banner"
          width="1234"
          height="690"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src={Men.src}
          alt="Men"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src={Accessories.src}
          alt="Accessories"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src={Watch.src}
          alt="Watch"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  );
}
