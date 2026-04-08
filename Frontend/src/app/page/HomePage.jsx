import Preview from "../component/homePage/CategoryPreview";
import Promo from "../component/homePage/Promo";
import Service from "../component/homePage/Service";
import Deals from "../component/homePage/DealsPreview";
import WatchCollection from "../component/homePage/WatchCollectionPreview";
import SeoContent from "../component/homePage/SeoContent";
import SiteShell from "@/components/layout/SiteShell";
import Link from "next/link";

function HomePage() {
  return (
    <SiteShell>
      <section className="bg-orange-100 px-4 pt-20 sm:px-6 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
            Velora
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-amber-950 sm:text-5xl lg:text-6xl">
            Modern fashion, watches, and accessories
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-amber-800">
            Velora curates clean, wearable pieces for everyday outfits that
            still feel intentional. Discover clothing, statement watches, and
            finishing accessories designed to make getting dressed feel easier
            from the first click to checkout.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-amber-900/90">
            Browse new arrivals, compare collections by category, and build a
            wardrobe that moves with workdays, weekends, and travel. The store
            keeps the path simple so shoppers can find pieces they will actually
            wear again and again.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-md bg-amber-950 px-8 py-3 text-center font-medium text-white transition hover:bg-amber-900"
          >
            Shop Collection
          </Link>
        </div>
      </section>
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <SeoContent />
      <Service />
    </SiteShell>
  );
}

export default HomePage;


