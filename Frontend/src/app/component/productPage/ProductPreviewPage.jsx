"use client";
// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slice/BasketSlice";
import withMenuLayout from "../layout/index";
import { fetchProductById } from "../../api/API_Products";
import {
  fetchReviews as fetchProductReviews,
  createReview as submitReview,
} from "../../api/API_Reviews";

function ProductPreview({ productId }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const colors = [
    { name: "White", value: "white", bg: "bg-gray-100" },
    { name: "Gray", value: "gray", bg: "bg-gray-400" },
    { name: "Black", value: "black", bg: "bg-black" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));

    fetchProductReviews(productId)
      .then((data) => setReviews(data || []))
      .catch(() => setReviews([]));
  }, [productId]);

  const ratingCounts = useMemo(() => {
    return reviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {});
  }, [reviews]);

  const totalRatings = reviews.length || 1;
  const average =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalRatings;

  const price = product?.newPrice ?? product?.price ?? 0;
  const oldPrice = product?.oldPrice ?? product?.price ?? price;

  const addToBasket = (item) => {
    if (!item) return;
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
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-amber-950 text-lg">
        Loading product...
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen flex justify-center items-center text-amber-950 text-lg">
        {error || "Product not found"}
      </div>
    );

  const buyNow = (item) => {
    addToBasket(item);
    router.push("/order");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please add your name and comment before submitting a review.");
      return;
    }

    try {
      await submitReview(productId, newReview);
      setReviews((prev) => [
        ...prev,
        {
          ...newReview,
          rating: Number(newReview.rating) || 5,
        },
      ]);
      setNewReview({ name: "", rating: 5, comment: "" });
    } catch {
      // fallback to local append
      setReviews((prev) => [
        ...prev,
        { ...newReview, rating: Number(newReview.rating) || 5 },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 px-6 lg:px-20 py-10 pt-36">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-amber-950 text-orange-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-900 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h2 className="text-xl font-bold text-amber-950">Product Preview</h2>
      </div>

      {/* Product content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left image */}
        <div className="flex justify-center items-center border-2 border-amber-950 rounded-lg shadow shadow-amber-950 bg-orange-50">
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Right details */}
        <div className="space-y-6 border-2 border-amber-950 rounded-lg bg-orange-50 p-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-950">
              {product.name}
            </h1>
            <p className="mt-2 text-amber-900">{product.description}</p>
          </div>

          {/* Price */}
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

          {/* Colors */}
          <div>
            <h3 className="font-semibold text-amber-950 mb-2">Color</h3>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full border-2 ${color.bg} ${
                    selectedColor === color.value
                      ? "border-amber-950 scale-110"
                      : "border-amber-800 hover:scale-105"
                  } transition-transform`}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold text-amber-950 mb-2">Size</h3>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "border-amber-950 bg-amber-950 text-amber-50"
                      : "border-amber-950 text-amber-950 hover:bg-amber-50"
                  } transition`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => addToBasket(product)}
              className="flex-1 min-w-[140px] bg-amber-950 text-orange-50 py-3 rounded-md font-semibold hover:bg-amber-900 transition"
            >
              Add to Bag
            </button>

            <button
              onClick={() => buyNow(product)}
              className="flex-1 min-w-[140px] bg-amber-950 text-orange-50 py-3 rounded-md font-semibold hover:bg-amber-900 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Highlights */}
          <div className="pt-6 border-t border-amber-950">
            <h3 className="font-semibold text-amber-950">Highlights</h3>
            <ul className="mt-2 list-disc list-inside text-amber-900 space-y-1">
              <li>Hand cut and sewn locally</li>
              <li>Dyed with proprietary colors</li>
              <li>Pre-washed and pre-shrunk</li>
              <li>Ultra-soft cotton blend</li>
            </ul>
          </div>

          {/* Details */}
          <div className="pt-4">
            <h3 className="font-semibold text-amber-950 mb-1">Details</h3>
            <p className="text-amber-900">{product.details}</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <section id="reviews" className="mt-16 border-t-2 border-amber-950 pt-10">
        <h2 className="text-2xl font-bold text-amber-950 mb-6">
          Customer Reviews
        </h2>

        {/* Summary */}
        <div className="flex flex-col lg:flex-row gap-10 mb-10">
          <div className="flex flex-col items-center justify-center lg:w-1/3">
            <div className="flex items-center gap-1 text-amber-950 text-3xl font-bold">
              {average.toFixed(1)}
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
                  <div
                    key={stars}
                    className="flex items-center gap-3 text-amber-950"
                  >
                    <span className="w-16 text-right">{stars} stars</span>
                    <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-amber-950 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{percent}%</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="grid gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-orange-50 border border-amber-950 rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-amber-950">{r.name}</h4>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={
                        j < r.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-amber-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-amber-900">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Add a review */}
        <form
          onSubmit={handleReviewSubmit}
          className="mt-10 bg-orange-50 border border-amber-950 rounded-lg p-5 space-y-4"
        >
          <h3 className="text-lg font-semibold text-amber-950">
            Share your thoughts
          </h3>
          <input
            type="text"
            placeholder="Your name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview((p) => ({ ...p, name: e.target.value }))
            }
            className="w-full border border-amber-950 rounded-md p-3 bg-white text-amber-950"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center gap-2 text-amber-900">
              Rating
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview((p) => ({
                    ...p,
                    rating: Number(e.target.value),
                  }))
                }
                className="border border-amber-950 rounded-md p-2 bg-white text-amber-950"
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} star{val > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <textarea
            placeholder="What did you like? What could be better?"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview((p) => ({ ...p, comment: e.target.value }))
            }
            className="w-full min-h-[120px] border border-amber-950 rounded-md p-3 bg-white text-amber-950"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-950 text-orange-50 rounded-md font-semibold hover:bg-amber-900"
          >
            Submit review
          </button>
        </form>
      </section>
    </div>
  );
}

const WrappedProductPreview = withMenuLayout(ProductPreview);
export default WrappedProductPreview;
