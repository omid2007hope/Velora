// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Banner from "../../assets/Images/Banner.png";
import Men from "../../assets/Images/Men.png";
import Accessories from "../../assets/Images/Accessories.png";
import Watch from "../../assets/Images/Watch.png";

export default function PromoCarousel() {
  return (
    <Carousel
      autoplay
      shape="bar"
      className="rounded-lg shadow-md overflow-hidden"
      style={{
        height: 400,
        background: "#f7f3ef",
      }}
    >
      <img src={Banner} alt="Banner" className="w-full h-full object-cover" />
      <img src={Men} alt="Men" className="w-full h-full object-cover" />
      <img
        src={Accessories}
        alt="Accessories"
        className="w-full h-full object-cover"
      />
      <img src={Watch} alt="Watch" className="w-full h-full object-cover" />
    </Carousel>
  );
}
