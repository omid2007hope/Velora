// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function MenPhoto() {
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
          src="https://content.moss.co.uk/images/extraextralarge/966806670_01.jpg"
          alt="Banner"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src="https://cdnc.lystit.com/photos/3329-2014/07/23/dsquared-blue-distressed-denim-jacket-product-1-21944452-2-706694096-normal.jpeg"
          alt="Men"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src="https://ae01.alicdn.com/kf/HTB1dDJ_KXXXXXc5XVXXq6xXFXXXA/Slim-Fit-Formal-Men-Wedding-Suits-Black-Men-Business-Suits-Luxury-Brand-Fashion-Mens-Skinny-Suits.jpg"
          alt="Accessories"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-full object-cover"
        />
        <img
          src="https://d1fufvy4xao6k9.cloudfront.net/looks/498/black-polo-shirt-outfit-1.jpg"
          alt="Watch"
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
