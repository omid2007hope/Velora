import ProductListPage from "../page/ProductListPage.jsx";
import JsonLd from "@/components/seo/JsonLd";
import { getProducts } from "@/lib/server-api";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPageMetadata,
} from "@/lib/seo";

function normalizeParam(value) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function getProductsRouteState(searchParams = {}) {
  const rawCategory = normalizeParam(searchParams.category).trim();
  const search = normalizeParam(searchParams.search).trim();
  const rawIsNew = normalizeParam(searchParams.new).trim().toLowerCase();
  const legacyNewCategory = rawCategory.toLowerCase() === "new";
  const isNew = rawIsNew === "true" || rawIsNew === "1" || legacyNewCategory;
  const category = legacyNewCategory ? "" : rawCategory;

  return { category, isNew, search };
}

function buildCatalogPath({ category, isNew, search }) {
  if (search) {
    return "/products";
  }

  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (isNew) {
    params.set("new", "true");
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

function buildCatalogSeo(state) {
  if (state.search) {
    return {
      title: `Search results for "${state.search}"`,
      heading: `Search results for "${state.search}"`,
      description: `Browse Velora search results for ${state.search} across clothing, watches, and accessories.`,
      path: buildCatalogPath(state),
      noIndex: true,
      keywords: [state.search],
    };
  }

  if (state.isNew) {
    return {
      title: "New arrivals",
      heading: "New Arrivals",
      description:
        "Shop Velora's latest arrivals across modern apparel, watches, and everyday accessories.",
      path: buildCatalogPath(state),
      noIndex: false,
      keywords: ["new arrivals"],
    };
  }

  if (state.category) {
    return {
      title: `${state.category} collection`,
      heading: `${state.category} Collection`,
      description: `Explore Velora's ${state.category.toLowerCase()} collection of refined everyday essentials.`,
      path: buildCatalogPath(state),
      noIndex: false,
      keywords: [state.category],
    };
  }

  return {
    title: "Shop all products",
    heading: "All Products",
    description:
      "Browse the full Velora catalog of clothing, watches, and accessories in one place.",
    path: "/products",
    noIndex: false,
    keywords: ["all products"],
  };
}

export async function generateMetadata({ searchParams }) {
  const state = getProductsRouteState(searchParams);
  const seo = buildCatalogSeo(state);

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    noIndex: seo.noIndex,
    keywords: seo.keywords,
  });
}

export default async function ProductsPage({ searchParams }) {
  const state = getProductsRouteState(searchParams);
  const seo = buildCatalogSeo(state);
  const products = await getProducts({
    category: state.category || undefined,
    isNew: state.isNew,
    search: state.search || undefined,
  }).catch(() => []);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: seo.heading, path: seo.path },
          ]),
          buildCollectionPageSchema({
            title: seo.heading,
            description: seo.description,
            path: seo.path,
            products,
          }),
        ]}
      />
      <ProductListPage />
    </>
  );
}
