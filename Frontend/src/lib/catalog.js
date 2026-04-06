const CATEGORY_ROUTE_MAP = {
  men: {
    slug: "men",
    label: "Men",
    title: "Men's Collection",
    description:
      "Browse Velora's men's collection of clothing, watches, and everyday accessories.",
    path: "/category/men",
    keywords: ["Men", "menswear"],
    filters: { category: "Men" },
  },
  women: {
    slug: "women",
    label: "Women",
    title: "Women's Collection",
    description:
      "Browse Velora's women's collection of clothing, watches, and everyday accessories.",
    path: "/category/women",
    keywords: ["Women", "womenswear"],
    filters: { category: "Women" },
  },
  accessories: {
    slug: "accessories",
    label: "Accessories",
    title: "Accessories Collection",
    description:
      "Browse Velora's accessories collection, from statement pieces to everyday essentials.",
    path: "/category/accessories",
    keywords: ["Accessories"],
    filters: { subCategory: "Accessories" },
  },
  watch: {
    slug: "watch",
    label: "Watch",
    title: "Watch Collection",
    description:
      "Browse Velora's watch collection and discover refined pieces for every day.",
    path: "/category/watch",
    keywords: ["Watch", "watches"],
    filters: { subCategory: "Watch" },
  },
  "new-arrivals": {
    slug: "new-arrivals",
    label: "New Arrivals",
    title: "New Arrivals",
    description:
      "Shop Velora's latest arrivals across clothing, watches, and accessories.",
    path: "/category/new-arrivals",
    keywords: ["New Arrivals"],
    filters: { isNew: true },
  },
};

export const catalogRoutes = Object.values(CATEGORY_ROUTE_MAP);

export const catalogMenuLinks = catalogRoutes.filter(
  (route) => route.slug !== "new-arrivals",
);

export function normalizeCatalogSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCatalogRoute(slug) {
  return CATEGORY_ROUTE_MAP[normalizeCatalogSlug(slug)] || null;
}

export function getCatalogPath(slug) {
  return getCatalogRoute(slug)?.path || "/products";
}

export function getCatalogFilters(slug) {
  return getCatalogRoute(slug)?.filters || {};
}
