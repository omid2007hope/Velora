// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Watch from "../../assets/Images/Watch.png";

export default function PromoCarousel() {
  const Photos = [
    Watch,
    "https://images.augustman.com/wp-content/uploads/sites/2/2022/10/27044039/gold-watch-for-men.jpg",
    "https://i.pinimg.com/originals/14/32/6f/14326fd9259d826653ef8b29e8a41c23.jpg",
  ];
  return (
    <div className="w-full h-full object-cover">
      <Carousel
        autoplay
        shape="bar"
        className="rounded-lg shadow-md overflow-hidden"
        style={{
          height: 400,
          background: "#f7f3ef",
        }}
      >
        {Photos.map((item, id) => {
          return (
            <img
              src={item}
              alt="Banner"
              key={id}
              className="w-full h-full object-cover"
            />
          );
        })}
      </Carousel>
    </div>
  );
}
