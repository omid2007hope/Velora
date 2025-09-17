import Banner from "../assets/Images/Banner.png";

export default function Promo() {
  return (
    <div className="relative overflow-hidden bg-orange-100 pt-20 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-8 lg:pb-8">
      <div className="relative w-full px-4 sm:px-6 lg:px-16 py-8 sm:py-0 lg:py-0 ">
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
            <a
              href="#"
              className="inline-block mt-8 lg:mt-12 rounded-md bg-amber-950 px-10 py-4 text-center font-medium text-white hover:bg-amber-900 self-start ml-0 sm:ml-8 lg:ml-0"
            >
              Shop Collection
            </a>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={Banner}
              alt="Summer collection"
              className="w-full h-auto lg:w-full rounded-md object-cover border-2 border-amber-950 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
