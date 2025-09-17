import Men from "../assets/Images/Men.png";
import Women from "../assets/Images/Women.png";
import New from "../assets/Images/New.png";
import Accessories from "../assets/Images/Accessories.png";

export default function Preview() {
  const categories = [
    {
      name: "New Arrivals",
      img: New, // model wearing trendy clothes
    },
    {
      name: "Accessories",
      img: Accessories, // watch + bracelet
    },
    {
      name: "Men’s Collection",
      img: Men, // men’s outfit
    },
    {
      name: "Women’s Collection",
      img: Women, // women’s fashion
    },
  ];

  return (
    <div className="bg-orange-100">
      <section className="px-4 sm:px-6 lg:px-16 py-8 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
          {/* Left Column */}
          <div className="grid grid-rows-2 gap-6 h-full">
            <div className="grid grid-cols-2 gap-6">
              {categories.slice(0, 2).map((cat) => (
                <a
                  key={cat.name}
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-amber-950"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold text-white">
                      {cat.name}
                    </h3>
                    <span className="text-sm text-white/90">Shop now</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Wide Card */}
            <a
              key={categories[2].name}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
            >
              <img
                src={categories[2].img}
                alt={categories[2].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-amber-950"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">
                  {categories[2].name}
                </h3>
                <button className="mt-2 rounded-full bg-amber-950 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-900">
                  Shop now
                </button>
              </div>
            </a>
          </div>

          {/* Right Column → Tall Card */}
          <a
            key={categories[3].name}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-72 sm:h-[500px] lg:h-full"
          >
            <img
              src={categories[3].img}
              alt={categories[3].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-amber-950"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-bold text-white">
                {categories[3].name}
              </h3>
              <button className="mt-2 rounded-full bg-amber-950 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-900">
                Shop now
              </button>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
