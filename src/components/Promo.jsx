export default function Promo() {
  return (
    <div className="relative overflow-hidden bg-rose-100 h-150 pt-30">
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-rose-900 sm:text-6xl">
            Summer styles are finally here
          </h1>
          <p className="mt-4 text-xl text-rose-400">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-rose-600 px-8 py-3 text-center font-medium text-white hover:bg-rose-700 mt-30"
          >
            Shop Collection
          </a>
        </div>

        {/* Decorative image grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none lg:absolute lg:inset-y-0 lg:right-10 lg:w-1/2 flex justify-center"
        >
          <div className="flex space-x-6 lg:space-x-8">
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg">
                <img
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
