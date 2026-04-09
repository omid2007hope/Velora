"use client";

import { Filter } from "lucide-react";
import Link from "next/link";
import {
  catalogNavigation,
  catalogQuickLinks,
} from "@/constants/catalog-navigation";
import ProductSearchBar from "@/features/catalog/components/ProductSearchBar";

export default function CatalogSidebar({
  category,
  subCategory,
  searchText,
  onSearchChange,
  onSearchSubmit,
  onCategoryClick,
  onNewArrivalsClick,
}) {
  function isSidebarLinkActive(navCategoryName, item) {
    if (category !== navCategoryName) {
      return false;
    }

    if (item.name === "Browse All") {
      return !subCategory;
    }

    return (
      item.href.includes(`subCategory=${subCategory}`) || item.name === subCategory
    );
  }

  return (
    <aside className="hidden min-h-[calc(100vh-96px)] w-1/4 flex-col border-r-2 border-amber-900 bg-orange-100 shadow-lg md:flex lg:w-1/6">
      <div className="flex flex-col items-center justify-center border-b-2 border-amber-900 p-4 pt-7 shadow-md">
        <ProductSearchBar
          value={searchText}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        <div className="space-y-4">
          <h3 className="mb-3 flex items-center gap-2 font-bold text-amber-950">
            <Filter size={16} /> Categories
          </h3>

          <div className="space-y-4 text-amber-900">
            <button
              type="button"
              className={`block cursor-pointer text-left transition hover:text-amber-950 ${
                !category && !subCategory
                  ? "font-bold text-amber-800"
                  : "font-medium text-amber-900"
              }`}
              onClick={() => onCategoryClick("")}
            >
              All
            </button>

            {catalogNavigation.map((navCategory) => (
              <div key={navCategory.id} className="space-y-2">
                <button
                  type="button"
                  className={`block text-left text-base font-bold transition hover:text-amber-950 ${
                    category === navCategory.name
                      ? "text-amber-800"
                      : "text-amber-900"
                  }`}
                  onClick={() => onCategoryClick(navCategory.name)}
                >
                  {navCategory.name}
                </button>

                <div className="ml-3 space-y-2 border-l border-amber-900/40 pl-3">
                  {navCategory.sections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <p className="text-sm font-semibold text-amber-950">
                        {section.name}
                      </p>

                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={`block text-sm transition hover:text-amber-950 ${
                                isSidebarLinkActive(navCategory.name, item)
                                  ? "font-semibold text-amber-800"
                                  : "font-normal text-amber-900"
                              }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-6 pt-6">
          <div className="border-t border-amber-900 pt-4">
            <h3 className="mb-3 font-bold text-amber-950">Quick Links</h3>

            <ul className="space-y-2 text-amber-900">
              {catalogQuickLinks.map((link) => (
                <li key={link.name}>
                  {link.name === "New Arrivals" ? (
                    <button
                      type="button"
                      onClick={onNewArrivalsClick}
                      className="w-full text-left transition hover:text-amber-950"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.path} className="transition hover:text-amber-950">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-amber-900 pt-4 text-center text-xs text-amber-900">
            <p>Free Shipping over $50</p>
            <p className="mt-1">© 2025 Omid Teimory Store</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
