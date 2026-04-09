export function normalizeParam(value) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function getProductsRouteState(searchParams = {}) {
  const rawCategory = normalizeParam(searchParams.category).trim();
  const rawSubCategory = normalizeParam(searchParams.subCategory).trim();
  const search = normalizeParam(searchParams.search).trim();
  const rawIsNew = normalizeParam(searchParams.new).trim().toLowerCase();
  const legacyNewCategory = rawCategory.toLowerCase() === "new";
  const legacyNewSubCategory = rawSubCategory.toLowerCase() === "new";
  const isNew = rawIsNew === "true" || rawIsNew === "1" || legacyNewCategory;
  const category = legacyNewCategory ? "" : rawCategory;
  const subCategory = legacyNewSubCategory ? "" : rawSubCategory;

  return { category, subCategory, isNew, search };
}

export function buildCatalogPath({ category, subCategory, isNew, search }) {
  if (search) {
    return "/products";
  }

  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (subCategory) params.set("subCategory", subCategory);
  if (isNew) params.set("new", "true");

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function buildCatalogSeo(state, resultsCount = 0) {
  const resultsLabel = `${resultsCount} product${resultsCount === 1 ? "" : "s"}`;

  if (state.search) {
    return {
      title: `Search results for "${state.search}"`,
      heading: `Search results for "${state.search}"`,
      description: `Showing ${resultsLabel.toLowerCase()} that match "${state.search}".`,
      path: buildCatalogPath(state),
      noIndex: true,
      keywords: [state.search],
    };
  }

  if (state.isNew) {
    return {
      title: "New arrivals",
      heading: "New Arrivals",
      description: `Fresh drops from the latest Velora release. ${resultsLabel} available right now.`,
      path: buildCatalogPath(state),
      noIndex: false,
      keywords: ["new arrivals"],
    };
  }

  if (state.category) {
    return {
      title: `${state.category} collection`,
      heading: `${state.category} Collection`,
      description: `Browse ${resultsLabel.toLowerCase()} in the ${state.category.toLowerCase()} range.`,
      path: buildCatalogPath(state),
      noIndex: false,
      keywords: [state.category],
    };
  }

  if (state.subCategory) {
    return {
      title: `${state.subCategory} collection`,
      heading: `${state.subCategory} Collection`,
      description: `Browse ${resultsLabel.toLowerCase()} in the ${state.subCategory.toLowerCase()} range.`,
      path: buildCatalogPath(state),
      noIndex: false,
      keywords: [state.subCategory],
    };
  }

  return {
    title: "Shop all products",
    heading: "All Products",
    description:
      "Explore the full Velora catalog of clothing, watches, and accessories.",
    path: "/products",
    noIndex: false,
    keywords: ["all products"],
  };
}
