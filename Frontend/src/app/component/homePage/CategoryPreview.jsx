// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import Image from "next/image";
import Men from "../../assets/image/Men.webp";
import Women from "../../assets/image/Women.webp";
import New from "../../assets/image/New.webp";
import Accessories from "../../assets/image/Accessories.webp";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "New Arrivals",
    img: New,
    id: "new",
  },
  {
    name: "Accessories",
    img: Accessories,
    id: "subCategory=Accessories",
  },
  {
    name: "Men's Collection",
    img: Men,
    id: "category=Men",
  },
  {
    name: "Women's Collection",
    img: Women,
    id: "category=Women",
  },
];

const categoryLink = (id) =>
  id === "new" ? "/products?new=true" : `/products?${id}`;

export default function Preview() {
  return (
    <div className="bg-orange-200 border-t-2 border-b-2 border-amber-950">
      <section className="px-4 sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-16">
        <div className="mb-6 max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
            Shop by category
          </p>
          <h2 className="text-3xl font-bold text-amber-950 sm:text-4xl">
            Explore the collections built around everyday style
          </h2>
          <p className="text-base leading-7 text-amber-900">
            Start with the categories that matter most. Velora makes it easy to
            move from new arrivals to accessories, men&apos;s pieces, and
            women&apos;s favorites without digging through a cluttered catalog.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
          {/* Left Column */}
          <div className="grid grid-rows-2 gap-6 h-full">
            <div className="grid grid-cols-2 gap-6">
              {CATEGORIES.slice(0, 2).map((cat) => (
                <Link
                  href={categoryLink(cat.id)}
                  key={cat.name}
                  aria-label={`Shop ${cat.name}`}
                  className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="border-2 border-amber-950 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
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
              href={categoryLink(CATEGORIES[2].id)}
              aria-label={`Shop ${CATEGORIES[2].name}`}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-48 sm:h-64 lg:h-full"
            >
              <div className="absolute inset-0">
                <Image
                  src={CATEGORIES[2].img}
                  alt={CATEGORIES[2].name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="border-2 border-amber-950 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">
                  {CATEGORIES[2].name}
                </h3>
                <span className="mt-2 inline-flex rounded-full bg-amber-950 px-4 py-1.5 text-sm font-semibold text-white">
                  Shop now
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column + Tall Card */}
          <Link
            href={categoryLink(CATEGORIES[3].id)}
            aria-label={`Shop ${CATEGORIES[3].name}`}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition h-72 sm:h-[500px] lg:h-full"
          >
            <div className="absolute inset-0">
              <Image
                src={CATEGORIES[3].img}
                alt={CATEGORIES[3].name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="border-2 border-amber-950 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-bold text-white">
                {CATEGORIES[3].name}
              </h3>
              <span className="mt-2 inline-flex rounded-full bg-amber-950 px-4 py-1.5 text-sm font-semibold text-white">
                Shop now
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
