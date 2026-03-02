import WithMenuLayout from "../component/layout/index";
import ProductList from "../component/productListPage/ProductListPage";

function ProductListPage() {
  return (
    <>
      <ProductList />
    </>
  );
}

const WrappedProductListPage = WithMenuLayout(ProductListPage);
export default WrappedProductListPage;
