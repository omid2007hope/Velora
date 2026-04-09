import SiteShell from "@/app/components/layout/SiteShell";
import CategoryPreview from "@/app/features/home/components/CategoryPreview";
import DealsPreview from "@/app/features/home/components/DealsPreview";
import Promo from "@/app/features/home/components/Promo";
import SeoContent from "@/app/features/home/components/SeoContent";
import Service from "@/app/features/home/components/Service";
import WatchCollectionPreview from "@/app/features/home/components/WatchCollectionPreview";

export default function HomePage() {
  return (
    <SiteShell>
      <Promo />
      <CategoryPreview />
      <DealsPreview />
      <WatchCollectionPreview />
      <SeoContent />
      <Service />
    </SiteShell>
  );
}
