"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SiteShell from "@/app/components/layout/SiteShell";
import CatalogSidebar from "@/app/features/catalog/components/CatalogSidebar";
import ProductCard from "@/app/features/catalog/components/ProductCard";
import ProductSearchBar from "@/app/features/catalog/components/ProductSearchBar";
import { useCatalogProducts } from "@/app/features/catalog/hooks/use-catalog-products";
import {
  buildCatalogSeo,
  getProductsRouteState,
} from "@/app/features/catalog/utils/catalog-state";

export default function CatalogPage({ initialState }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeState = useMemo(
    () =>
      initialState || getProductsRouteState(Object.fromEntries(searchParams.entries())),
    [initialState, searchParams],
  );
  const [searchText, setSearchText] = useState(routeState.search);
  const { products, loading, error } = useCatalogProducts({
    category: routeState.category || undefined,
    subCategory: routeState.subCategory || undefined,
    isNew: routeState.isNew,
    search: routeState.search || undefined,
  });
  const seo = useMemo(
    () => buildCatalogSeo(routeState, products.length),
    [routeState, products.length],
  );

  useEffect(() => {
    setSearchText(routeState.search);
  }, [routeState.search]);

  function updateQuery(nextCategory, nextSearch, nextIsNew, nextSubCategory) {
    const params = new URLSearchParams();
    const finalCategory = nextIsNew ? "" : nextCategory;
    const finalSubCategory = nextIsNew ? "" : nextSubCategory;

    if (finalCategory) params.set("category", finalCategory);
    if (finalSubCategory) params.set("subCategory", finalSubCategory);
    if (nextIsNew) params.set("new", "true");
    if (nextSearch) params.set("search", nextSearch);

    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  }

  return (
    <SiteShell>
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-orange-50 pt-24 md:flex-row">
        <CatalogSidebar
          category={routeState.category}
          subCategory={routeState.subCategory}
          searchText={searchText}
          onSearchChange={setSearchText}
          onSearchSubmit={(text) =>
            updateQuery(
              routeState.category,
              text,
              routeState.isNew,
              routeState.subCategory,
            )
          }
          onCategoryClick={(category) =>
            updateQuery(
              category === "Watch" || category === "Accessories" ? "" : category,
              routeState.search,
              false,
              category === "Watch" || category === "Accessories" ? category : "",
            )
          }
          onNewArrivalsClick={() => updateQuery("", routeState.search, true, "")}
        />

        <section className="flex-1 overflow-y-auto" aria-label="Product catalog">
          <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-12">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg border p-2.5 font-bold text-amber-950 transition hover:bg-amber-950 hover:text-white"
              >
                <ArrowLeft /> Back
              </Link>
              <div className="visible flex-grow md:hidden lg:hidden">
                <ProductSearchBar
                  value={searchText}
                  onChange={setSearchText}
                  onSubmit={(text) =>
                    updateQuery(
                      routeState.category,
                      text,
                      routeState.isNew,
                      routeState.subCategory,
                    )
                  }
                />
              </div>
            </div>

            <header className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
                Velora Catalog
              </p>
              <h1 className="mt-2 text-3xl font-bold text-amber-950 sm:text-4xl">
                {seo.heading}
              </h1>
              <p className="mt-3 text-base text-amber-900 sm:text-lg">
                {seo.description}
              </p>
            </header>

            {loading ? (
              <div className="rounded-2xl border-2 border-dashed border-amber-900 bg-orange-100 px-6 py-12 text-center text-amber-950">
                <p className="text-xl font-semibold">Loading products...</p>
              </div>
            ) : error ? (
              <div className="rounded-2xl border-2 border-dashed border-amber-900 bg-orange-100 px-6 py-12 text-center text-amber-950">
                <p className="text-xl font-semibold">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-amber-900 bg-orange-100 px-6 py-12 text-center text-amber-950">
                <p className="text-xl font-semibold">No products found</p>
                <p className="mt-2 text-sm text-amber-900 sm:text-base">
                  Try a different search term or browse another category.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
