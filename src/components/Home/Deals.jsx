import { Link } from "react-router-dom";
import { deals } from "../../Data";

export default function Deals() {
  return (
    <section className="bg-orange-100 px-0 lg:px-8 sm:px-6 py-0 lg:py-8 sm:py-0 pb lg:pb-8 sm:pb-0">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-8 lg:py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((deal) => (
            <Link key={deal.id} to={`/product/${deal.id}`}>
              <div className="rounded-xl bg-orange-200 shadow-md overflow-hidden hover:shadow-xl transition border-2 border-amber-950">
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    {deal.discount}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-amber-950">
                    {deal.name}
                  </h3>
                  <div className="mt-2 flex items-center space-x-3">
                    <span className="text-lg font-bold text-amber-950">
                      {deal.newPrice}
                    </span>
                    <span className="text-sm text-amber-800 line-through">
                      {deal.oldPrice}
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
