// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Banner from "../../assets/Images/Banner.png";
import Men from "../../assets/Images/Men.png";
import Accessories from "../../assets/Images/Accessories.png";
import Watch from "../../assets/Images/Watch.png";

export default function PromoCarousel() {
  const photos = [Banner, Men, Accessories, Watch];
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
        {photos.map((item, id) => {
          return (
            <img
              key={id}
              src={item}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          );
        })}
      </Carousel>
    </div>
  );
}
