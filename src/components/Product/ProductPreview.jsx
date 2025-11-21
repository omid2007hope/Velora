import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as ProductApi from "../../API/Product";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/basketRender";
import withMenuLayout from "../Layout/Index";

function ProductPreview() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const colors = [
    { name: "White", value: "white", bg: "bg-gray-100" },
    { name: "Gray", value: "gray", bg: "bg-gray-400" },
    { name: "Black", value: "black", bg: "bg-black" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const getProductById = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const { data, status } = await ProductApi.fetchProductById(id); // expects /products/:id
      console.log(data, status);

      setProduct(data ?? null);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to load product.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-100 px-6 lg:px-20 py-10">
        <p className="text-amber-950">Loading…</p>
      </div>
    );
  }

  if (errorMsg || !product) {
    return (
      <div className="min-h-screen bg-orange-100 px-6 lg:px-20 py-10">
        <p className="text-red-700">{errorMsg || "Product not found."}</p>
      </div>
    );
  }

  const reviews = [
    { name: "John Doe", rating: 5, comment: "Perfect fit and quality." },
    {
      name: "Sarah W.",
      rating: 4,
      comment: "Love the fabric, shipping was fast.",
    },
    { name: "David K.", rating: 5, comment: "Stylish and comfortable." },
    {
      name: "Emma T.",
      rating: 3,
      comment: "Color slightly off, but still nice.",
    },
  ];

  const ratingCounts = { 5: 64, 4: 22, 3: 10, 2: 3, 1: 1 };
  const totalRatings = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
  const average =
    Object.entries(ratingCounts).reduce(
      (sum, [stars, count]) => sum + stars * count,
      0
    ) / totalRatings;

  function addToBasket(item) {
    if (!item) return;
    dispatch(addItem({ ...item, selectedColor, selectedSize }));
  }

  // useEffect(() => {
  //   const found = products.find((y) => String(y.id) === String(id));
  //   setProduct(found || null);
  // }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center text-amber-950 text-lg">
        Loading product...
      </div>
    );

  function buyNow(item) {
    if (!item) return;

    // Add to basket first
    dispatch(addItem({ ...item, selectedColor, selectedSize }));

    // Then go to checkout
    Navigate("/Order"); // or /Checkout depending on your routing
  }

  return (
    <div className="min-h-screen bg-orange-100 px-6 lg:px-20 py-10 pt-35">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
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
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Right details */}
        <div className="space-y-6 border-2 border-amber-950 rounded-lg bg-orange-50 p-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-950">
              {product.title}
            </h1>
            <p className="mt-2 text-amber-900">
              The Basic Tee 6-Pack allows you to fully express your personality
              with multiple color options. Designed for comfort, style, and
              durability — made from 100% soft cotton.
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-amber-950">
              {product.price}
            </p>
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
                      ? "border-amber-950 bg-orange-200 text-amber-950"
                      : "border-amber-950 text-amber-950 hover:bg-orange-50"
                  } transition`}
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
              <li>Pre-washed & pre-shrunk</li>
              <li>Ultra-soft 100% cotton</li>
            </ul>
          </div>

          {/* Details */}
          <div className="pt-4">
            <h3 className="font-semibold text-amber-950 mb-1">Details</h3>
            <p className="text-amber-900">
              Includes two black, two white, and two gray tees. Join our
              subscription to get early access to limited-edition colors.
            </p>
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
                    <span className="w-10 text-right">{stars}★</span>
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
      </section>
    </div>
  );
}

// Wrap with menu layout
const WrappedProductPreview = withMenuLayout(ProductPreview);

// Export the wrapped version
export default WrappedProductPreview;
