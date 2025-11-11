import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { products } from "../../Data";
import { Link } from "react-router-dom";

export default function ProductList() {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-orange-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-1/4 lg:w-1/6 h-full border-r-2 border-amber-900 bg-orange-100 shadow-lg">
        <div className="flex flex-col items-center justify-center h-1/6 border-b-2 border-amber-900 shadow-md p-4">
          <SearchBar />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto pt-25">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <div className="rounded-xl bg-orange-200 border-2 border-amber-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover sm:h-56 md:h-60"
                    />
                    <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-md">
                      {item.discount}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between h-[180px]">
                    <h3 className="text-base sm:text-lg font-semibold text-amber-950 truncate">
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
      </main>
    </div>
  );
}
