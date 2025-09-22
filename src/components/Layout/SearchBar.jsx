import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="flex items-center ml-0 sm:ml-8 lg:ml-8">
      <input
        type="text"
        placeholder="Search"
        className="bg-orange-50 border-2 border-amber-950 rounded-l-lg pl-3 pr-0 sm:pr-20 lg:pr-20 py-1.5 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700"
      />
      <button className="bg-amber-950 text-orange-50 font-bold py-2 sm:py-2 lg:py-2 px-2 sm:px-2 lg:px-2 flex items-center justify-center rounded-r-lg border-2 border-amber-950 hover:bg-amber-800">
        <MagnifyingGlassIcon className="h-5 w-5 text-orange-50 font-bold" />
      </button>
    </div>
  );
}
