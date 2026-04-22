"use client";

import Link from "next/link";
import SectionCard from "@/app/components/ui/SectionCard";
import { useSellerProducts } from "@/app/features/seller/hooks/product/use-seller-products";

export default function SellerProductsOverview() {
  const { products, loading, error } = useSellerProducts();

  return (
    <SectionCard id="seller-products" className="max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            Your Listings
          </p>
          <h2 className="mt-2 text-2xl font-bold text-amber-950">
            Recently added products
          </h2>
        </div>

        <Link
          href="/seller/products/new"
          className="inline-flex rounded-full border border-amber-950 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-950 hover:text-orange-50"
        >
          Add another product
        </Link>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-orange-200 bg-orange-50 p-5"
            >
              <div className="h-5 w-40 animate-pulse rounded bg-orange-200" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-orange-100" />
              <div className="mt-6 h-4 w-24 animate-pulse rounded bg-orange-200" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-amber-300 bg-orange-50 p-8 text-center">
          <p className="text-lg font-semibold text-amber-950">
            No seller products yet
          </p>
          <p className="mt-2 text-sm text-amber-800">
            Publish your first product from the seller panel to start building
            your catalog.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product._id}
              className="rounded-3xl border border-orange-200 bg-orange-50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-amber-950">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-amber-800">
                    {product.category}
                    {product.subCategory ? ` / ${product.subCategory}` : ""}
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-950">
                  ${Number(product.price || 0).toFixed(2)}
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm text-amber-900">
                {product.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
