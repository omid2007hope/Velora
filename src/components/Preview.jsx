const callouts = [
  {
    name: "New Arrivals",
    description: "Shop now",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg",
    imageAlt: "Models wearing new arrivals.",
    href: "#",
    size: "large",
  },
  {
    name: "Accessories",
    description: "Shop now",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-02.jpg",
    imageAlt: "Hats on a shelf.",
    href: "#",
    size: "small",
  },
  {
    name: "Workspace",
    description: "Shop now",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-03.jpg",
    imageAlt: "Desk workspace with organizer and phone.",
    href: "#",
    size: "small",
  },
];

export default function Preview() {
  return (
    <div className="bg-rose-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories →
            </a>
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-6">
            {/* Left big image */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href={callouts[0].href} className="group block relative">
                <img
                  src={callouts[0].imageSrc}
                  alt={callouts[0].imageAlt}
                  className="h-96 w-full object-cover rounded-lg group-hover:opacity-75"
                />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold text-white">
                    {callouts[0].name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {callouts[0].description}
                  </p>
                </div>
              </a>
            </div>

            {/* Right stacked images */}
            <div className="grid grid-cols-1 gap-y-6">
              {callouts.slice(1).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group block relative"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="h-44 w-full object-cover rounded-lg group-hover:opacity-75"
                  />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
