// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import Image from "next/image";
import Link from "next/link";
import Accessories from "@/app/assets/image/Accessories.webp";
import Men from "@/app/assets/image/Men.webp";
import New from "@/app/assets/image/New.webp";
import Women from "@/app/assets/image/Women.webp";

const CATEGORIES = [
  { name: "New Arrivals", img: New, id: "new" },
  { name: "Accessories", img: Accessories, id: "subCategory=Accessories" },
  { name: "Men's Collection", img: Men, id: "category=Men" },
  { name: "Women's Collection", img: Women, id: "category=Women" },
];

const categoryLink = (id) =>
  id === "new" ? "/products?new=true" : `/products?${id}`;

export default function CategoryPreview() {
  return (
    <div className="border-b-2 border-t-2 border-amber-950 bg-orange-200">
      <section className="px-4 py-8 sm:px-6 sm:py-8 lg:px-16 lg:py-16">
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
        <div className="grid grid-cols-1 gap-6 lg:h-[600px] lg:grid-cols-2">
          <div className="grid h-full grid-rows-2 gap-6">
            <div className="grid grid-cols-2 gap-6">
              {CATEGORIES.slice(0, 2).map((category) => (
                <Link
                  key={category.name}
                  href={categoryLink(category.id)}
                  aria-label={`Shop ${category.name}`}
                  className="group relative block h-48 overflow-hidden rounded-xl shadow-md transition hover:shadow-xl sm:h-64 lg:h-full"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={category.img}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="border-2 border-amber-950 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <span className="text-sm text-white/90">Shop now</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href={categoryLink(CATEGORIES[2].id)}
              aria-label={`Shop ${CATEGORIES[2].name}`}
              className="group relative block h-48 overflow-hidden rounded-xl shadow-md transition hover:shadow-xl sm:h-64 lg:h-full"
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

          <Link
            href={categoryLink(CATEGORIES[3].id)}
            aria-label={`Shop ${CATEGORIES[3].name}`}
            className="group relative block h-72 overflow-hidden rounded-xl shadow-md transition hover:shadow-xl sm:h-[500px] lg:h-full"
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
