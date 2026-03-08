"use client";
// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026

// Imports
import { ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./Searchbar.jsx";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/API_Products";

// main function
export default function ProductList() {
  // use searchParams to get produt's id from URL
  const searchParams = useSearchParams();
  // import router to handle routes by using next.js
  const router = useRouter();

  // use searchParams to handle the categorys instead of the old way
  const rawCategory = searchParams.get("category") || "";
  // and also use search params to handle search
  const searchQuery = searchParams.get("search") || "";
  //  Find that if a product is new or not by using searchParams from URL
  const isNewQuery =
    (searchParams.get("new") || "").trim().toLowerCase() === "true" ||
    (searchParams.get("new") || "").trim() === "1";
  // Find the new category by checking the name of all categorys
  const legacyNewCategory = rawCategory.trim().toLowerCase() === "new";

  // if the product was new
  const isNew = isNewQuery || legacyNewCategory;
  // Prioritize the legacyNewCategory and even "" over rawCategory
  const category = legacyNewCategory ? "" : rawCategory;

  // searhText useState is being handeld by seachQuery
  const [searchText, setSearchText] = useState(searchQuery);
  // useState product is a list
  const [products, setProducts] = useState([]);

  // Check the length of the products
  const resultsLabel =
    products.length === 1 ? "1 product" : `${products.length} products`;
  // Define the name of all categorie options
  const categories = ["Men", "Women", "Accessories", "Watch"];
  // Define the name and the path of all quickLinks
  const quickLinks = [
    { name: "All Products", path: "/products" },
    { name: "New Arrivals", path: "/products?new=true" },
    { name: "Accessories", path: "/products?category=Accessories" },
  ];
  // Each time that we have a searchQuery, Fill the searchText useState with the searchQuery
  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  //

  useEffect(() => {
    fetchProducts({
      category: category || undefined,
      isNew,
      search: searchQuery || undefined,
    })
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]));
  }, [category, searchQuery, isNew]);

  const updateQuery = (category, search, isNewFilter = isNew) => {
    const params = new URLSearchParams();

    // If "new arrivals" is selected, category should not be used
    let finalCategory = category;
    if (isNewFilter) {
      finalCategory = "";
    }

    // Add category filter
    if (finalCategory) {
      params.set("category", finalCategory);
    }

    // Add "new" filter
    if (isNewFilter) {
      params.set("new", "true");
    }

    // Add search filter
    if (search) {
      params.set("search", search);
    }

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    router.push(url);
  };

  const handleSearchSubmit = (text) => {
    updateQuery(category, text);
  };

  const handleCategoryClick = (cat) => {
    updateQuery(cat, searchQuery, false);
  };

  const handleNewArrivalsClick = () => {
    updateQuery("", searchQuery, true);
  };

  const query = category;
  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : isNew
      ? "New Arrivals"
      : category
        ? `${category} Collection`
        : "All Products";
  const pageDescription = searchQuery
    ? `Showing ${resultsLabel.toLowerCase()} that match "${searchQuery}".`
    : isNew
      ? `Fresh drops from the latest Velora release. ${resultsLabel} available right now.`
      : category
        ? `Browse ${resultsLabel.toLowerCase()} in the ${category.toLowerCase()} range.`
        : "Explore the full Velora catalog of clothing, watches, and accessories.";

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-orange-50 overflow-hidden pt-24">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-1/4 lg:w-1/6 min-h-[calc(100vh-96px)] border-r-2 border-amber-900 bg-orange-100 shadow-lg">
        {/* SEARCH */}
        <div className="flex flex-col items-center justify-center border-b-2 border-amber-900 shadow-md p-4 pt-7">
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
                onClick={() => handleCategoryClick("")}
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer hover:text-amber-950 transition ${
                    cat === query ? "text-amber-800 font-bold" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat)}
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
                  {link.name === "New Arrivals" ? (
                    <button
                      onClick={handleNewArrivalsClick}
                      className="hover:text-amber-950 transition text-left w-full"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.path}
                      className="hover:text-amber-950 transition"
                    >
                      {link.name}
                    </Link>
                  )}
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
              href="/"
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

          <header className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
              Velora Catalog
            </p>
            <h1 className="mt-2 text-3xl font-bold text-amber-950 sm:text-4xl">
              {pageTitle}
            </h1>
            <p className="mt-3 text-base text-amber-900 sm:text-lg">
              {pageDescription}
            </p>
          </header>

          {/* PRODUCTS */}
          {products.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-amber-900 bg-orange-100 px-6 py-12 text-center text-amber-950">
              <p className="text-xl font-semibold">No products found</p>
              <p className="mt-2 text-sm text-amber-900 sm:text-base">
                Try a different search term or browse another category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((item) => {
                const productId = item._id || item.id;
                const image = item.imageUrl || item.image;
                const price = item.newPrice ?? item.price;
                const oldPrice = item.oldPrice ?? item.price;
                return (
                  <div
                    key={productId}
                    className="rounded-xl bg-orange-200 border-2 border-amber-950 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden"
                  >
                    <Link href={`/products/${productId}`}>
                      <div className="relative">
                        <img
                          src={image}
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
                          ${price}
                        </span>
                        <span className="text-sm text-amber-800 line-through">
                          ${oldPrice}
                        </span>
                      </div>

                      <Link href={`/products/${productId}`}>
                        <button className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition">
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
