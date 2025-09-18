import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Cart from "./Page/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
