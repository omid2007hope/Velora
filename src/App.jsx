import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import ProductList from "./Page/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
