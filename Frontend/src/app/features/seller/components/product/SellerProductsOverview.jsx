"use client";

import Link from "next/link";
import SectionCard from "@/app/components/ui/SectionCard";
import { deleteProductById } from "@/api";
import { useSellerProducts } from "@/app/features/seller/hooks/product/use-seller-products";

export default function SellerProductsOverview() {
  const { products, loading, error, setProducts } = useSellerProducts();

  async function deleteProduct(id) {
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  }

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
              className="flex flex-col rounded-3xl border border-orange-200 bg-orange-50 p-5 transition-all hover:shadow-lg hover:border-amber-300"
            >
              <div className="mb-4 flex gap-2">
                <button className="inline-flex rounded-full border border-amber-950 px-4 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-950 hover:text-orange-50 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2">
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="inline-flex rounded-full border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>

              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-950 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-amber-700">
                    {product.category}
                    {product.subCategory ? ` / ${product.subCategory}` : ""}
                  </p>
                </div>
                <div className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-amber-950 shadow-sm">
                  ${Number(product.price || 0).toFixed(2)}
                </div>
              </div>

              <p className="flex-1 line-clamp-3 text-sm text-amber-900">
                {product.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
