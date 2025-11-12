import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Page/Home";
import Order from "../Page/Order";
import ProductPage from "../Page/ProductPage";
import AccountPage from "../Page/AccountPage";
import ProductListPage from "../Page/ProductListPage";
import AddressForm from "../components/Layout/AccountPages/AddressForm";
import PaymentForm from "../components/Layout/AccountPages/PaymentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/AccountPage" element={<AccountPage />} />
        <Route path="/AccountPage/AddressForm" element={<AddressForm />} />
        <Route path="/AccountPage/PaymentForm" element={<PaymentForm />} />
        <Route path="/ProductListPage" element={<ProductListPage />} />
        <Route path="/Product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
