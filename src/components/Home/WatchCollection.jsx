import React from "react";
import Watch from "../../assets/Images/Watch.png";
import PromoBanner from "../../components/Home/WatchBanner";
export default function WatchCollection() {
  return (
    <section className="w-full border-t-2 border-b-2 border-amber-950">
      <div className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Content */}
          <div className="flex items-center justify-center bg-orange-200 text-amber-950 p-10 lg:p-16">
            <div className="max-w-md space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Watch Collection
              </h2>
              <p className="text-amber-800 text-sm sm:text-base">
                Upgrade your style with timeless watches that keep you sharp and
                confident every day.
              </p>
              <button className="mt-4 px-6 py-3 bg-amber-950 border-2 border-amber-950 rounded-md font-semibold hover:bg-amber-800 text-orange-50 transition">
                View the collection
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full h-64 sm:h-96 lg:h-full">
            <PromoBanner />
          </div>
        </div>
      </div>
    </section>
  );
}
