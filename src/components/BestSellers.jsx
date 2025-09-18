import React from "react";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    price: "$48",
    image: "/images/earthen-bottle.jpg",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    price: "$35",
    image: "/images/nomad-tumbler.jpg",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    price: "$89",
    image: "/images/focus-paper-refill.jpg",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    price: "$35",
    image: "/images/mechanical-pencil.jpg",
  },
  {
    id: 5,
    name: "Focus Card Tray",
    price: "$64",
    image: "/images/card-tray.jpg",
  },
  {
    id: 6,
    name: "Focus Multi-Pack",
    price: "$39",
    image: "/images/multi-pack.jpg",
  },
  {
    id: 7,
    name: "Brass Scissors",
    price: "$50",
    image: "/images/brass-scissors.jpg",
  },
  {
    id: 8,
    name: "Focus Carry Pouch",
    price: "$32",
    image: "/images/carry-pouch.jpg",
  },
];

import Shirt from "../assets/Images/Shirt.png";

export default function BestSellers() {
  return (
    <section className="w-full bg-orange-100 px-6 sm:px-10 lg:px-20 py-12">
      <h2 className="text-3xl font-bold text-amber-950 mb-10">Best Sellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-orange-200 border-2 border-amber-950 rounded-lg p-2"
          >
            <div className="w-full aspect-square overflow-hidden rounded-lg border-2 border-amber-950">
              <img
                src={Shirt}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300  "
              />
            </div>
            <h3 className="mt-4 text-sm text-amber-800 ">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-amber-950">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
