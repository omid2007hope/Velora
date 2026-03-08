"use client";

import Preview from "../component/homePage/CategoryPreview";
import Promo from "../component/homePage/Promo";
import Service from "../component/homePage/Service";
import Deals from "../component/homePage/DealsPreview";
import WatchCollection from "../component/homePage/WatchCollectionPreview";
import SiteShell from "@/components/layout/SiteShell";

function HomePage() {
  return (
    <SiteShell>
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <Service />
    </SiteShell>
  );
}

export default HomePage;


