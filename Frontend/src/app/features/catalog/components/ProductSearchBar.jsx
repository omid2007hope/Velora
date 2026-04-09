"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ProductSearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center" role="search">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <input
        id="product-search"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 rounded-l-lg border-2 border-amber-950 bg-orange-50 px-3 py-2 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700"
      />
      <button
        type="submit"
        aria-label="Submit product search"
        className="flex items-center justify-center rounded-r-lg border-2 border-amber-950 bg-amber-950 px-3 py-[0.625rem] text-orange-50 transition hover:bg-amber-800"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
