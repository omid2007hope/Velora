import SiteShell from "@/components/layout/SiteShell";
import Preview from "@/app/component/homePage/CategoryPreview";
import Promo from "@/app/component/homePage/Promo";
import Service from "@/app/component/homePage/Service";
import Deals from "@/app/component/homePage/DealsPreview";
import WatchCollection from "@/app/component/homePage/WatchCollectionPreview";
import SeoContent from "@/app/component/homePage/SeoContent";

export default function HomePage() {
  return (
    <SiteShell>
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <SeoContent />
      <Service />
    </SiteShell>
  );
}
