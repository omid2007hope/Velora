export default function Deals() {
  const deals = [
    {
      id: 1,
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155223f9a5?auto=format&fit=crop&w=600&q=80",
      oldPrice: "$199",
      newPrice: "$99",
      discount: "50% OFF",
    },
    {
      id: 2,
      name: "Smart Watch",
      image:
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
      oldPrice: "$249",
      newPrice: "$149",
      discount: "40% OFF",
    },
    {
      id: 3,
      name: "Minimalist Chair",
      image:
        "https://images.unsplash.com/photo-1582582425713-dbf45f93b07d?auto=format&fit=crop&w=600&q=80",
      oldPrice: "$399",
      newPrice: "$199",
      discount: "50% OFF",
    },
    {
      id: 4,
      name: "Stylish Backpack",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155223f9a5?auto=format&fit=crop&w=600&q=80",
      oldPrice: "$89",
      newPrice: "$49",
      discount: "45% OFF",
    },
  ];

  return (
    <section className="bg-orange-100 px-0 lg:px-8 sm:px-6 py-0 lg:py-0 sm:py-0 pb-0 lg:pb-8 sm:pb-0">
      {/* Full width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Full-width product grid */}
        <div className="py-8 sm:py-8 lg:py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="rounded-xl bg-orange-50 shadow-md overflow-hidden hover:shadow-xl transition border-2 border-amber-950"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="h-56 w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-950 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {deal.discount}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-amber-950">
                  {deal.name}
                </h3>
                <div className="mt-2 flex items-center space-x-3">
                  <span className="text-lg font-bold text-amber-950">
                    {deal.newPrice}
                  </span>
                  <span className="text-sm text-amber-800 line-through">
                    {deal.oldPrice}
                  </span>
                </div>
                <button className="mt-4 w-full rounded-lg bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 transition">
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
