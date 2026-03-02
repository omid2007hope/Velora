"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../page/HomePage.jsx";
import OrderPage from "../page/OrderPage.jsx";
import ProductPage from "../page/ProductPage.jsx";
import AccountPage from "../page/AccountPage.jsx";
import ProductListPage from "../page/ProductListPage.jsx";
import AddressForm from "../component/layout/accountPage/accountSetting/Address.jsx";
import PaymentForm from "../component/layout/accountPage/accountSetting/Payment.jsx";

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
