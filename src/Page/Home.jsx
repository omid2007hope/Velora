/* eslint-disable react-refresh/only-export-components */
import Preview from "../components/Home/Preview";
import Promo from "../components/Home/Promo";
import WithMenuLayout from "../components/Layout/Index";
import Service from "../components/Home/Service";
import Deals from "../components/Home/Deals";
import WatchCollection from "../components/Home/WatchCollection";
import BestSellers from "../components/Home/BestSellers";

function Home() {
  return (
    <>
      <Promo />
      <Preview />
      <Deals />
      <WatchCollection />
      <BestSellers />
      <Service />
    </>
  );
}

export default WithMenuLayout(Home);
