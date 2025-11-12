import { useNavigate } from "react-router-dom";
import Banner from "../../assets/Images/Banner.png";
import PromoCarousel from "./PromoBanner";

export default function Promo() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-orange-100 pt-20 md:pt-30 sm:pt-24 lg:pt-32 pb-8 sm:pb-8 lg:pb-8">
      <div className="relative w-full px-4 sm:px-6 lg:px-16 py-8 sm:py-0 lg:py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-10 lg:gap-0 items-center ">
          {/* Text Section */}
          <div className="max-w-4xl h-full flex flex-col justify-between py-0 sm:py-0 lg:py-0 px-0 sm:px-0 lg:px-0">
            {/* Heading + Paragraph */}
            <div className="space-y-6 lg:space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-amber-950 sm:text-6xl ml-0 sm:ml-8 lg:ml-0">
                Summer styles are finally here
              </h1>
              <p className="text-lg text-amber-800 ml-0 sm:ml-8 lg:ml-0 mr-10 sm:mr-10 lg:mr-10">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate("/ProductListPage")}
              className="inline-block mt-8 lg:mt-12 rounded-md bg-amber-950 px-10 py-4 text-center font-medium text-white hover:bg-amber-900 self-start ml-0 sm:ml-8 lg:ml-0"
            >
              Shop Collection
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <PromoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
