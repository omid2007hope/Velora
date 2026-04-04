// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import dynamic from "next/dynamic";
import Link from "next/link";

const CATEGORY_ID = "Watch";

const WatchCarousel = dynamic(() => import("./WatchBanner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center border-2 border-amber-950 bg-orange-100 text-amber-950 sm:h-96">
      Loading...
    </div>
  ),
});

export default function WatchCollection() {
  return (
    <section
      aria-label="Watch collection"
      className="w-full border-t-2 border-b-2 border-amber-950"
    >
      <div className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Content */}
          <div className="flex items-center justify-center bg-orange-200 px-6 py-10 text-amber-950 lg:px-16 lg:py-16">
            <div className="max-w-md space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Watch Collection
              </h2>

              <p className="text-amber-800 text-sm sm:text-base">
                Upgrade your style with timeless watches that keep you sharp and
                confident every day.
              </p>

              <Link
                href={`/products?subCategory=${CATEGORY_ID}`}
                aria-label="View watch collection"
                className="mt-4 inline-block rounded-md border-2 border-amber-950 bg-amber-950 px-6 py-3 font-semibold text-orange-50 transition hover:scale-105 hover:bg-amber-800 active:scale-95"
              >
                View the collection
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="min-h-[300px] w-full sm:min-h-[400px] lg:h-full">
            <WatchCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
