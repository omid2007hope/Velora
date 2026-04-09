// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addItem } from "../../redux/slice/BasketSlice";
import { fetchProducts } from "@/features/catalog/services/catalog-service";

function normalizeProduct(item) {
  return {
    ...item,
    id: item._id || item.id,
    image: item.imageUrl || item.image,
    newPrice: item.newPrice ?? item.price,
    oldPrice: item.oldPrice ?? item.price,
  };
}

export default function Deals() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    async function loadDeals() {
      try {
        const data = await fetchProducts({ isNew: true });
        setPreview((data ?? []).slice(0, 4));
      } catch {
        setPreview([]);
      }
    }

    loadDeals();
  }, []);

  const shopNow = useCallback((item) => {
    if (!item) return;

    const product = normalizeProduct(item);

    dispatch(
      addItem({
        ...product,
        selectedColor: "black",
        selectedSize: "M",
      }),
    );

    router.push("/order");
  }, [dispatch, router]);

  return (
    <section className="bg-orange-100 px-4 sm:px-6 lg:px-16 py-8">
      <div className="w-full">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {preview.map((item) => {
            const product = normalizeProduct(item);

            return (
              <div
                key={product.id}
                className="rounded-xl bg-orange-200 shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform border-2 border-amber-950"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-56 w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="h-full w-full object-cover"
                    />

                    {product.discount && (
                      <span className="absolute top-3 left-3 rounded-md bg-amber-950 px-3 py-1 text-sm font-semibold text-white shadow">
                        {product.discount}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-amber-950 truncate">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center space-x-3">
                    <span className="text-lg font-bold text-amber-950">
                      ${product.newPrice}
                    </span>

                    <span className="text-sm text-amber-800 line-through">
                      ${product.oldPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => shopNow(product)}
                    aria-label={`Buy ${product.name}`}
                    className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


