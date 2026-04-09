// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import dynamic from "next/dynamic";
import Link from "next/link";

const CATEGORY_ID = "Watch";

const WatchBanner = dynamic(() => import("./WatchBanner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center border-2 border-amber-950 bg-orange-100 text-amber-950 sm:h-96">
      Loading...
    </div>
  ),
});

export default function WatchCollectionPreview() {
  return (
    <section
      aria-label="Watch collection"
      className="w-full border-b-2 border-t-2 border-amber-950"
    >
      <div className="relative w-full">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center bg-orange-200 px-6 py-10 text-amber-950 lg:px-16 lg:py-16">
            <div className="max-w-md space-y-4">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Watch Collection
              </h2>

              <p className="text-sm text-amber-800 sm:text-base">
                Upgrade your style with timepieces that feel polished, modern,
                and easy to wear every day. Our watch edit leans into clean
                silhouettes, wearable tones, and statement pieces that work with
                both casual and dressed-up looks.
              </p>

              <p className="text-sm text-amber-900 sm:text-base">
                Whether you prefer a minimal face or a bolder profile, the
                collection is meant to add personality without overpowering the
                rest of your outfit.
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

          <div className="min-h-[300px] w-full sm:min-h-[400px] lg:h-full">
            <WatchBanner />
          </div>
        </div>
      </div>
    </section>
  );
}
