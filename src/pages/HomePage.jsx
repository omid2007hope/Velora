import Preview from "../components/Home/Preview";
import Promo from "../components/Home/Promo";
import WithMenuLayout from "../components/Layout/Index";
import Service from "../components/Home/Service";
import Deals from "../components/Home/Deals";
import WatchCollection from "../components/Home/WatchCollection";
import { Seo } from "../utils/seo";
import Banner from "../assets/Images/Banner.webp";

function HomePage() {
  return (
    <>
      <Seo
        title="Velora | Curated fashion by Omid Teimory"
        description="Discover Velora's curated fashion for men, women, watches, and accessories. Built and developed by Omid Teimory."
        image={Banner}
      />
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <Service />
    </>
  );
}

export default WithMenuLayout(HomePage);
