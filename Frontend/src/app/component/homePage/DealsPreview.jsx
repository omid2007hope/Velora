// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addItem } from "../../redux/slice/BasketSlice";
import { fetchProducts } from "../../api/API_Products";

export default function Deals() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    fetchProducts({ isNew: true })
      .then((data) => setPreview((data || []).slice(0, 4)))
      .catch(() => setPreview([]));
  }, []);

  function shopNow(item) {
    if (!item) return;

    const productId = item._id || item.id;

    // Default values since Deals section has no selectors
    dispatch(
      addItem({
        ...item,
        id: productId,
        image: item.imageUrl || item.image,
        newPrice: item.newPrice ?? item.price,
        oldPrice: item.oldPrice ?? item.price,
        selectedColor: "black",
        selectedSize: "M",
      }),
    );

    router.push("/order"); // go to checkout
  }

  return (
    <section className="bg-orange-100 px-4 sm:px-6 lg:px-16 py-8">
      <div className="w-full">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {preview.map((item) => (
            <div
              key={item._id || item.id}
              className="rounded-xl bg-orange-200 shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform border-2 border-amber-950"
            >
              <Link href={`/products/${item._id || item.id}`}>
                <div className="relative">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="h-56 w-full object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
                    {item.discount}
                  </span>
                </div>
              </Link>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-amber-950 truncate">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center space-x-3">
                  <span className="text-lg font-bold text-amber-950">
                    ${item.newPrice ?? item.price}
                  </span>

                  <span className="text-sm text-amber-800 line-through">
                    ${item.oldPrice ?? item.price}
                  </span>
                </div>

                <button
                  onClick={() => shopNow(item)}
                  className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


