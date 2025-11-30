import WithMenuLayout from "../components/Layout/Index";
import ProductList from "../components/ProductList/ProductList";
import { Seo } from "../utils/seo";

function ProductListPage() {
  return (
    <>
      <Seo
        title="Shop Products | Velora"
        description="Browse Velora's catalog of curated fashion picks across men, women, accessories, and watches. Crafted by Omid Teimory."
      />
      <ProductList />
    </>
  );
}

const WrappedProductListPage = WithMenuLayout(ProductListPage);
export default WrappedProductListPage;
