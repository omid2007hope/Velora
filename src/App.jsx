import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import AddressForm from "./components/Layout/AccountPages/AddressForm";
import PaymentForm from "./components/Layout/AccountPages/PaymentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/address" element={<AddressForm />} />
        <Route path="/account/payment" element={<PaymentForm />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
