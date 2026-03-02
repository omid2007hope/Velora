import Preview from "../component/homePage/CategoryPreview";
import Promo from "../component/homePage/Promo";
import WithMenuLayout from "../component/layout/index";
import Service from "../component/homePage/Service";
import Deals from "../component/homePage/DealsPreview";
import WatchCollection from "../component/homePage/WatchCollectionPreview";

function HomePage() {
  return (
    <>
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <Service />
    </>
  );
}

export default WithMenuLayout(HomePage);
