/* eslint-disable react-refresh/only-export-components */
import "./Home.css";
import Preview from "../components/Preview";
import Promo from "../components/Promo";
import WithMenuLayout from "../components/Layout/Index";
import Service from "../components/Service";
import Deals from "../components/Deals";

function Home() {
  return (
    <>
      <Promo />
      <Preview />
      <Deals />
      <Service />
    </>
  );
}

export default WithMenuLayout(Home);
