import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../Data";

export default function ProductPreview() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  console.log(product);

  const getProductById = () => {
    try {
      const x = products.find((y) => String(y.id) === String(id));
      setProduct(x);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductById();
  });

  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");

  const colors = [
    { name: "White", value: "white", bg: "bg-gray-100" },
    { name: "Gray", value: "gray", bg: "bg-gray-400" },
    { name: "Black", value: "black", bg: "bg-black" },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className="min-h-screen bg-orange-100 px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Images */}
        <div className="space-y-4">
          <div className="flex justify-center algin-center border-2 border-amber-950 rounded-lg shadow shadow-amber-950">
            <img
              src={product?.image}
              alt="Black Tee"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="space-y-6 lg:border-l-2 lg:border-b-2 rounded-lg border-amber-950 bg-orange-100">
          <div>
            <h1 className="text-2xl font-bold text-amber-950 ml-2 lg:ml-10 sm:ml-10 ">
              {product.name}
            </h1>
            <p className="mt-2 text-amber-900 ml-2 lg:ml-10 sm:ml-10 ">
              The Basic Tee 6-Pack allows you to fully express your vibrant
              personality with three grayscale options. Feeling adventurous? Put
              on a heather gray tee. Want to be a trendsetter? Try our exclusive
              colorway: “Black.” Need to add an extra pop of color to your
              outfit? Our white tee has you covered.
            </p>
          </div>

          {/* Price + Reviews */}
          <div className="flex items-center justify-between ml-2 lg:ml-10 sm:ml-10 ">
            <p className="text-2xl font-semibold text-amber-950">$192</p>
            <a href="#reviews" className="text-amber-950 hover:text-amber-900">
              117 reviews
            </a>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold text-amber-950 mb-2 ml-2 lg:ml-10 sm:ml-10 ">
              Color
            </h3>
            <div className="flex space-x-3 ml-2 lg:ml-10 sm:ml-10 ">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color.value
                      ? "border-amber-950"
                      : "border-amber-900"
                  } ${color.bg}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold text-amber-950 mb-2 ml-2 lg:ml-10 sm:ml-10 ">
              Size
            </h3>
            <div className="grid grid-cols-4 gap-3 ml-2 lg:ml-10 sm:ml-10 ">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "border-amber-950 bg-orange-200 text-amber-950"
                      : "border-amber-950 text-amber-950 hover:bg-orange-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag */}
          <div className="flex flex-rows">
            <button className="px-6 sm:px-30 lg:px-30 bg-amber-950 text-orange-50 py-3 rounded-md font-semibold hover:bg-amber-900 ml-9 sm:ml-26 lg:ml-26 ">
              Add to Bag
            </button>
            <button className="px-8 sm:px-30 lg:px-30 bg-amber-950 text-orange-50 py-3 rounded-md font-semibold hover:bg-amber-900 ml-2 sm:ml-5 lg:ml-5 ">
              Buy now
            </button>
          </div>

          {/* Highlights */}
          <div className="pt-6 border-t border-amber-950 ml-2 lg:ml-10 sm:ml-10 ">
            <h3 className="font-semibold text-amber-950">Highlights</h3>
            <ul className="mt-2 list-disc list-inside text-amber-900 space-y-1">
              <li>Hand cut and sewn locally</li>
              <li>Dyed with our proprietary colors</li>
              <li>Pre-washed & pre-shrunk</li>
              <li>Ultra-soft 100% cotton</li>
            </ul>
          </div>

          {/* Details */}
          <div className="pt-4">
            <h3 className="font-semibold text-amber-950 ml-2 lg:ml-10 sm:ml-10 ">
              Details
            </h3>
            <p className="text-amber-900 mt-2 ml-2 lg:ml-10 lg:mb-10">
              The 6-Pack includes two black, two white, and two heather gray
              Basic Tees. Sign up for our subscription service and be the first
              to get new, exciting colors, like our upcoming “Charcoal Gray”
              limited release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
