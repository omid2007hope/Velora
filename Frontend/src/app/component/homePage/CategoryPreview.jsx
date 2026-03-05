// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import Men from "../../assets/image/Men.webp";
import Women from "../../assets/image/Women.webp";
import New from "../../assets/image/New.webp";
import Accessories from "../../assets/image/Accessories.webp";
import Link from "next/link";

export default function Preview() {
  const categories = [
    {
      name: "New Arrivals",
      img: New.src,
      id: "new",
    },
    {
      name: "Accessories",
      img: Accessories.src,
      id: "Accessories",
    },
    {
      name: "Men's Collection",
      img: Men.src,
      id: "Men",
    },
    {
      name: "Women's Collection",
      img: Women.src,
      id: "Women",
    },
  ];

  return (
    <div className="bg-orange-200 border-t-2 border-b-2 border-amber-950">
      <section className="px-4 sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
          {/* Left Column */}
          <div className="grid grid-rows-2 gap-6 h-full">
            <div className="grid grid-cols-2 gap-6">
              {categories.slice(0, 2).map((cat) => (
                <Link
                  href={cat.id === "new" ? "/products?new=true" : `/products?category=${cat.id}`}
                  key={cat.name}
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    width="1536"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-amber-950"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold text-white">
                      {cat.name}
                    </h3>
                    <span className="text-sm text-white/90">Shop now</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Wide Card */}
            <Link
              href={`/products?category=${categories[2].id}`}
              key={categories[2].name}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
            >
              <img
                src={categories[2].img}
                alt={categories[2].name}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(min-width: 1024px) 50vw, 100vw"
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
            </Link>
          </div>

          {/* Right Column + Tall Card */}
          <Link
            href={`/products?category=${categories[3].id}`}
            key={categories[3].name}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-72 sm:h-[500px] lg:h-full"
          >
            <img
              src={categories[3].img}
              alt={categories[3].name}
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(min-width: 1024px) 50vw, 100vw"
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
          </Link>
        </div>
      </section>
    </div>
  );
}


