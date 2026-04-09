"use client";

import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import SiteShell from "@/app/components/layout/SiteShell";
import { addItem } from "@/app/redux/slice/BasketSlice";
import { useProductDetails } from "@/app/features/product/hooks/use-product-details";
import {
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  REVIEW_STARS,
} from "@/app/features/product/utils/product-options";

export default function ProductDetailPage({ productId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const {
    product,
    reviews,
    loading,
    error,
    reviewForm,
    setReviewForm,
    ratingCounts,
    totalRatings,
    averageRating,
    submitProductReview,
  } = useProductDetails(productId);

  const price = product?.newPrice ?? product?.price ?? 0;
  const oldPrice = product?.oldPrice ?? product?.price ?? price;
  const imageSrc = product?.imageUrl || product?.image || "/placeholder.jpg";

  function addToBasket(item) {
    if (!item) {
      return;
    }

    dispatch(
      addItem({
        id: item._id,
        name: item.name,
        image: item.imageUrl || item.image,
        newPrice: price,
        oldPrice,
        discount: item.discount || "",
        selectedColor,
        selectedSize,
      }),
    );
  }

  function buyNow(item) {
    addToBasket(item);
    router.push("/order");
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();

    try {
      await submitProductReview();
    } catch (submitError) {
      alert(submitError.message);
    }
  }

  if (loading) {
    return (
      <SiteShell>
        <div className="flex min-h-screen items-center justify-center text-lg text-amber-950">
          Loading product...
        </div>
      </SiteShell>
    );
  }

  if (error || !product) {
    return (
      <SiteShell>
        <div className="flex min-h-screen items-center justify-center text-lg text-amber-950">
          {error || "Product not found"}
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="min-h-screen bg-orange-100 px-6 py-10 pt-36 lg:px-20">
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-orange-50 transition hover:bg-amber-900"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h2 className="text-xl font-bold text-amber-950">Product Preview</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-lg border-2 border-amber-950 bg-orange-50 shadow shadow-amber-950">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-6 rounded-lg border-2 border-amber-950 bg-orange-50 p-6">
            <div>
              <h1 className="text-2xl font-bold text-amber-950">{product.name}</h1>
              <p className="mt-2 text-amber-900">{product.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold text-amber-950">${price}</p>
                <p className="text-lg text-amber-800 line-through">${oldPrice}</p>
                <span className="text-sm font-semibold text-green-700">
                  Save {product.discount}
                </span>
              </div>
              <a href="#reviews" className="text-amber-950 hover:text-amber-800">
                {totalRatings} reviews
              </a>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-amber-950">Color</h3>
              <div className="flex space-x-3">
                {PRODUCT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`h-10 w-10 rounded-full border-2 ${color.bg} ${
                      selectedColor === color.value
                        ? "scale-110 border-amber-950"
                        : "border-amber-800 hover:scale-105"
                    } transition-transform`}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-amber-950">Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {PRODUCT_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-amber-950 bg-amber-950 text-amber-50"
                        : "border-amber-950 text-amber-950 hover:bg-amber-50"
                    }`}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => addToBasket(product)}
                className="min-w-[140px] flex-1 rounded-md bg-amber-950 py-3 font-semibold text-orange-50 transition hover:bg-amber-900"
              >
                Add to Bag
              </button>

              <button
                onClick={() => buyNow(product)}
                className="min-w-[140px] flex-1 rounded-md bg-amber-950 py-3 font-semibold text-orange-50 transition hover:bg-amber-900"
              >
                Buy Now
              </button>
            </div>

            <div className="border-t border-amber-950 pt-6">
              <h3 className="font-semibold text-amber-950">Highlights</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-amber-900">
                <li>Hand cut and sewn locally</li>
                <li>Dyed with proprietary colors</li>
                <li>Pre-washed and pre-shrunk</li>
                <li>Ultra-soft cotton blend</li>
              </ul>
            </div>

            <div className="pt-4">
              <h3 className="mb-1 font-semibold text-amber-950">Details</h3>
              <p className="text-amber-900">{product.details}</p>
            </div>
          </div>
        </div>

        <section id="reviews" className="mt-16 border-t-2 border-amber-950 pt-10">
          <h2 className="mb-6 text-2xl font-bold text-amber-950">
            Customer Reviews
          </h2>

          <div className="mb-10 flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-col items-center justify-center lg:w-1/3">
              <div className="flex items-center gap-1 text-3xl font-bold text-amber-950">
                {averageRating.toFixed(1)}
                <Star className="fill-amber-500 text-amber-500" size={28} />
              </div>
              <p className="text-amber-900">{totalRatings} total ratings</p>
            </div>

            <div className="flex-1 space-y-2">
              {Object.entries(ratingCounts)
                .sort((a, b) => b[0] - a[0])
                .map(([stars, count]) => {
                  const percent = Math.round((count / totalRatings) * 100);

                  return (
                    <div key={stars} className="flex items-center gap-3 text-amber-950">
                      <span className="w-16 text-right">{stars} stars</span>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-orange-200">
                        <div
                          className="h-3 rounded-full bg-amber-950"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-sm">{percent}%</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="grid gap-6">
            {reviews.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="rounded-lg border border-amber-950 bg-orange-50 p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-amber-950">{review.name}</h4>
                  <div className="flex gap-1">
                    {REVIEW_STARS.map((starIndex) => (
                      <Star
                        key={starIndex}
                        size={16}
                        className={
                          starIndex < review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-amber-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-amber-900">{review.comment}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="mt-10 space-y-4 rounded-lg border border-amber-950 bg-orange-50 p-5"
          >
            <h3 className="text-lg font-semibold text-amber-950">
              Share your thoughts
            </h3>
            <input
              type="text"
              placeholder="Your name"
              value={reviewForm.name}
              onChange={(event) =>
                setReviewForm((previousForm) => ({
                  ...previousForm,
                  name: event.target.value,
                }))
              }
              className="w-full rounded-md border border-amber-950 bg-white p-3 text-amber-950"
            />
            <label className="flex items-center gap-2 text-amber-900">
              Rating
              <select
                value={reviewForm.rating}
                onChange={(event) =>
                  setReviewForm((previousForm) => ({
                    ...previousForm,
                    rating: Number(event.target.value),
                  }))
                }
                className="rounded-md border border-amber-950 bg-white p-2 text-amber-950"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} star{value > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
            <textarea
              placeholder="What did you like? What could be better?"
              value={reviewForm.comment}
              onChange={(event) =>
                setReviewForm((previousForm) => ({
                  ...previousForm,
                  comment: event.target.value,
                }))
              }
              className="min-h-[120px] w-full rounded-md border border-amber-950 bg-white p-3 text-amber-950"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-950 px-4 py-2 font-semibold text-orange-50 hover:bg-amber-900"
            >
              Submit review
            </button>
          </form>
        </section>
      </div>
    </SiteShell>
  );
}
