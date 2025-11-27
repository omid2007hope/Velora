// src/components/Home/PromoBanner.jsx
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function WomanPhoto({ images }) {
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
        {images.map((item) => {
          return (
            <img
              src={item.url}
              alt="Banner"
              key={item.id}
              className="w-full h-full object-cover"
            />
          );
        })}
      </Carousel>
    </div>
  );
}
