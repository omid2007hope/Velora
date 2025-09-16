/* eslint-disable react-refresh/only-export-components */
import "./Home.css";
import Preview from "../components/Preview";
import Promo from "../components/Promo";
import WithMenuLayout from "../components/Layout/Index";
import Service from "../components/Service";

function Home() {
  return (
    <>
      <Promo />
      <Preview />
      <Service />
    </>
  );
}

export default WithMenuLayout(Home);
