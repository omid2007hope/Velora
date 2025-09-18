/* eslint-disable react-refresh/only-export-components */
import "./Home.css";
import Preview from "../components/Preview";
import Promo from "../components/Promo";
import WithMenuLayout from "../components/Layout/Index";
import Service from "../components/Service";
import Deals from "../components/Deals";
import WatchCollection from "../components/WatchCollection";
import BestSellers from "../components/BestSellers";

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
