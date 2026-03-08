// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import CategoryCarousel from "../../../common/CategoryCarousel";

const images = [
  {
    src: "https://content.moss.co.uk/images/extraextralarge/966806670_01.jpg",
    alt: "Men's tailored suit collection",
  },
  {
    src: "https://cdnc.lystit.com/photos/3329-2014/07/23/dsquared-blue-distressed-denim-jacket-product-1-21944452-2-706694096-normal.jpeg",
    alt: "Men's denim outerwear",
  },
  {
    src: "https://ae01.alicdn.com/kf/HTB1dDJ_KXXXXXc5XVXXq6xXFXXXA/Slim-Fit-Formal-Men-Wedding-Suits-Black-Men-Business-Suits-Luxury-Brand-Fashion-Mens-Skinny-Suits.jpg",
    alt: "Men's formalwear",
  },
  {
    src: "https://d1fufvy4xao6k9.cloudfront.net/looks/498/black-polo-shirt-outfit-1.jpg",
    alt: "Men's casual polo outfit",
  },
];

export default function MenPhoto() {
  return <CategoryCarousel images={images} />;
}
