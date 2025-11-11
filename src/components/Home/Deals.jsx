import { Link } from "react-router-dom";
import { products } from "../../Data";

const preview = products.filter((x) => x.id < 5);

console.log(preview);

export default function Deals() {
  return (
    <section className="bg-orange-100 px-0 lg:px-8 sm:px-6 py-0 lg:py-8 sm:py-0 pb lg:pb-8 sm:pb-0">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-8 lg:py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {preview.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <div className="rounded-xl bg-orange-200 shadow-md overflow-hidden hover:shadow-xl transition border-2 border-amber-950">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    {item.discount}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-amber-950">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-center space-x-3">
                    <span className="text-lg font-bold text-amber-950">
                      {item.newPrice}
                    </span>
                    <span className="text-sm text-amber-800 line-through">
                      {item.oldPrice}
                    </span>
                  </div>
                  <button className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
