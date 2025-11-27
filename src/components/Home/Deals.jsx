import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/basketRender";

import * as productApi from "../../API/Product"; // adjust path
import { useEffect, useState } from "react";

export default function Deals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    const { data, status } = await productApi.fetchProducts();
    if (status === 200) {
      setProducts(data);
    }
  };

  useEffect(() => {
    // getProduct();
  }, []);

  function shopNow(item) {
    if (!item) return;

    // Default values since Deals section has no selectors
    dispatch(
      addItem({
        ...item,
        selectedColor: "black",
        selectedSize: "M",
      })
    );

    navigate("/Order"); // go to checkout
  }

  return (
    <section className="bg-orange-100 px-4 sm:px-6 lg:px-16 py-8">
      <div className="w-full">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-orange-200 shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform border-2 border-amber-950"
            >
              <Link to={`/product/${item.id}`}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-56 w-full object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
                    {item.discount}
                  </span>
                </div>
              </Link>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-amber-950 truncate">
                  {item.title}
                </h3>

                <div className="mt-2 flex items-center space-x-3">
                  <span className="text-lg font-bold text-amber-950">
                    {item.price}
                  </span>

                  <span className="text-sm text-amber-800 line-through">
                    {item.price}
                  </span>
                </div>

                <button
                  onClick={() => shopNow(item)}
                  className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
