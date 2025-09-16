export default function Preview() {
  const categories = [
    {
      name: "New Arrivals",
      img: "https://picsum.photos/id/1011/600/800",
    },
    {
      name: "Accessories",
      img: "https://picsum.photos/id/1025/600/800",
    },
    {
      name: "Workspace",
      img: "https://picsum.photos/id/1003/1200/600",
    },
    {
      name: "Lifestyle",
      img: "https://picsum.photos/id/1005/800/1200",
    },
  ];

  return (
    <div className="bg-orange-100">
      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-16 py-8 sm:py-8">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
          {/* Left Column */}
          <div className="grid grid-rows-2 gap-6 h-full">
            {/* Top two small cards */}
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

            {/* Wide card */}
            <a
              key={categories[2].name}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full border-2 border-amber-950"
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

          {/* Right Column → Tall card */}
          <a
            key={categories[3].name}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-72 sm:h-[500px] lg:h-full"
          >
            <img
              src={categories[3].img}
              alt={categories[3].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-30  border-2 border-amber-9500"
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
