import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Page/Home";
import Order from "../Page/Order";
import ProductPage from "../Page/ProductPage";
import AccountPage from "../Page/AccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Product/:id" element={<ProductPage />} />
        <Route path="/AccountPage" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
