import WithMenuLayout from "../components/Layout/Index";
import ProductList from "../components/ProductList/ProductList";

function ProductListPage() {
  return <ProductList />;
}

const WrappedProductListPage = WithMenuLayout(ProductListPage);
export default WrappedProductListPage;
