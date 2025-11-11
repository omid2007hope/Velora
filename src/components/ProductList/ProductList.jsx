import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function ProductList() {
  return (
    <div className="flex w-screen h-screen bg-orange-50">
      {/* Sidebar: visible on md+ */}
      <aside className="hidden md:flex flex-col w-0 md:w-1/4 lg:w-1/6 h-full border-r-2 border-amber-900 bg-orange-100 shadow-lg">
        <div className="flex flex-col items-center justify-end h-1/6 md:h-3/20 lg:h-1/6 border-b-2 border-amber-900 shadow-md">
          <SearchBar />
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Sidebar main content */}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1">
        {/* Main area content */}
      </main>
    </div>
  );
}
