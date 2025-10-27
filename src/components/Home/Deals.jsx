import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productApi from "../../API/Product"; // adjust path

export default function Deals() {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    const { data, status } = await productApi.fetchProducts();
    if (status === 200) {
      setProducts(data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`}>
            <div className="rounded-xl bg-orange-200 shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-amber-950">
                  {item.title}
                </h3>
                <div className="mt-2 text-lg font-bold text-amber-950">
                  €{item.price}
                </div>
                <button className="mt-4 w-full rounded-lg bg-amber-950 text-white py-2">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
