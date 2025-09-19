import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Order from "./Page/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
