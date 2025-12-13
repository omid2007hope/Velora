import { ArrowLeft, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { products } from "../../utils/products";
import { useEffect, useMemo, useState } from "react";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("category");

  const [searchText, setSearchText] = useState("");

  const categories = ["Men", "Women", "Accessories", "Watch"];

  const quickLinks = [
    { name: "All Products", path: "/products" },
    { name: "New Arrivals", path: "/products?category=New" },
    { name: "Accessories", path: "/products?category=Accessories" },
  ];

  const handleSearchSubmit = (text) => {
    setSearchText(text);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (query) {
      if (query === "New") {
        filtered = filtered.filter((x) => String(x.NewArrivals) === "true");
      } else {
        filtered = filtered.filter((x) => x.category === query);
      }
    }

    // Search filter
    if (searchText.trim()) {
      filtered = filtered.filter((x) =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }, [query, searchText]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-orange-50 overflow-hidden pt-24">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-1/4 lg:w-1/6 min-h-[calc(100vh-96px)] border-r-2 border-amber-900 bg-orange-100 shadow-lg">
        {/* SEARCH */}
        <div className="flex flex-col items-center justify-center border-b-2 border-amber-900 shadow-md p-4 pt-30">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onSubmit={handleSearchSubmit}
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="flex items-center gap-2 text-amber-950 font-bold mb-3">
              <Filter size={16} /> Categories
            </h3>

            <ul className="space-y-2 text-amber-900">
              <li
                className={`cursor-pointer hover:text-amber-950 transition ${
                  !query ? "text-amber-800 font-bold" : ""
                }`}
                onClick={() => setSearchParams({})}
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer hover:text-amber-950 transition ${
                    cat === query ? "text-amber-800 font-bold" : ""
                  }`}
                  onClick={() => setSearchParams({ category: cat })}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="pt-4 border-t border-amber-900">
            <h3 className="text-amber-950 font-bold mb-3">Quick Links</h3>

            <ul className="space-y-2 text-amber-900">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-amber-950 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-amber-900 text-center text-xs text-amber-900">
            <p>Free Shipping over $50</p>
            <p className="mt-1">© 2025 Omid Teimory Store</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section
        className="flex-1 h-full overflow-y-auto"
        aria-label="Product catalog"
      >
        {/* Search (mobile only) */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-8">
          {/* Back Button */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="text-amber-950 font-bold flex items-center gap-2 border rounded-lg p-2.5 hover:bg-amber-950 hover:text-white transition"
            >
              <ArrowLeft /> Back
            </Link>
            <div className="visible md:hidden lg:hidden flex-grow">
              <SearchBar
                value={searchText}
                onChange={setSearchText}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-orange-200 border-2 border-amber-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden"
              >
                <Link to={`/products/${item.id}`}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, 50vw"
                      className="h-48 w-full object-cover sm:h-56 md:h-60"
                    />

                    <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-md">
                      {item.discount}
                    </span>
                  </div>
                </Link>

                <div className="p-4 sm:p-5 flex flex-col justify-between h-[180px]">
                  <h3 className="text-base sm:text-lg font-semibold text-amber-950 truncate">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex items-center space-x-3">
                    <span className="text-lg font-bold text-amber-950">
                      ${item.newPrice}
                    </span>
                    <span className="text-sm text-amber-800 line-through">
                      ${item.oldPrice}
                    </span>
                  </div>

                  <Link to={`/products/${item.id}`}>
                    <button className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
