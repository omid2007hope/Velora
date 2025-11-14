// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function WomanPhoto() {
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
          src="https://i5.walmartimages.com/seo/YouLoveIt-Women-s-Summer-Dress-Mini-Dresses-V-Neck-Sleeveless-Ruffle-Loose-Fit-Swing-Beach-Cover-Plain-Solid-Color_4b1e590a-6e97-4af3-9232-b22e945e0642.3185ee131446db819ed7c5debd155715.jpeg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <img
          src="https://fancycorrectitude.com/wp-content/uploads/2020/10/09caf6d2-52bf-4522-9658-415804cca6d6-1900x2913.jpeg"
          alt="Men"
          className="w-full h-full object-cover"
        />
        <img
          src="https://i.pinimg.com/736x/4b/79/34/4b7934f1e9de7c90cfcbb2c040c4ddd1--mk-handbags-fashion-handbags.jpg"
          alt="Accessories"
          className="w-full h-full object-cover"
        />
        <img
          src="https://maxmetasmart.com/wp-content/uploads/2024/10/DALL%C2%B7E-2024-10-20-05.01.39-A-fashionable-woman-wearing-a-smart-casual-top-standing-in-a-modern-stylish-environment.-The-top-is-a-blend-of-elegance-and-comfort-with-a-loose-f.webp"
          alt="Watch"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  );
}
