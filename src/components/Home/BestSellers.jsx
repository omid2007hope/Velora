import React from "react";

import { Link } from "react-router-dom";

import { bestSellers } from "../../Data/Index";

export default function BestSellers() {
  return (
    <section className="w-full bg-orange-100 px-6 sm:px-10 lg:px-20 py-12">
      <h2 className="text-3xl font-bold text-amber-950 mb-10">Best Sellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {bestSellers.map((product) => (
          <Link to={`/Product/${product.id}?refre=bestSellers`}>
            <div
              key={product.id}
              className="group bg-orange-200 border-2 border-amber-950 rounded-lg p-2"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg border-2 border-amber-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300  "
                />
              </div>
              <h3 className="mt-4 text-sm text-amber-800 ">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-amber-950">
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
