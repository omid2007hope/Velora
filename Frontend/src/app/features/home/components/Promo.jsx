// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import dynamic from "next/dynamic";
import Link from "next/link";

const PromoBanner = dynamic(() => import("./PromoBanner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-amber-950 bg-orange-200 text-amber-950">
      Loading...
    </div>
  ),
});

export default function Promo() {
  return (
    <div className="relative overflow-hidden bg-orange-100 pb-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <div className="relative w-full px-4 py-8 sm:px-6 sm:py-0 lg:px-16 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="flex h-full max-w-4xl flex-col justify-between">
            <div className="space-y-6 lg:space-y-4">
              <h1 className="ml-0 text-4xl font-bold tracking-tight text-amber-950 sm:ml-8 sm:text-6xl lg:ml-0">
                Curated style for everyday dressing
              </h1>
              <p className="ml-0 mr-10 text-lg leading-8 text-amber-800 sm:ml-8 sm:mr-10 lg:ml-0 lg:mr-10">
                Velora curates clean, wearable pieces for everyday outfits that
                still feel intentional. From new arrivals and relaxed staples to
                statement watches and finishing accessories, every collection is
                built to make getting dressed feel easier.
              </p>
              <p className="ml-0 mr-10 text-base leading-7 text-amber-900/90 sm:ml-8 sm:mr-10 lg:ml-0 lg:mr-10">
                Browse seasonal drops, build a smarter rotation, and discover
                details that work together across workdays, weekends, and
                travel. The focus stays on versatile style, clear choices, and
                pieces that can move from one outfit to the next without
                friction.
              </p>
            </div>

            <Link
              href="/products"
              aria-label="Shop summer collection"
              className="ml-0 mt-8 inline-block self-start rounded-md bg-amber-950 px-10 py-4 text-center font-medium text-white hover:bg-amber-900 sm:ml-8 lg:ml-0 lg:mt-12"
            >
              Shop Collection
            </Link>
          </div>

          <div className="flex justify-center">
            <PromoBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
