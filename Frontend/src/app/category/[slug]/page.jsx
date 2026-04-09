import { notFound } from "next/navigation";
import CatalogPage from "@/features/catalog/CatalogPage";
import JsonLd from "@/components/seo/JsonLd";
import { getProducts } from "@/lib/server-api";
import { getCatalogFilters, getCatalogRoute } from "@/lib/catalog";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildNoIndexMetadata,
  buildPageMetadata,
} from "@/lib/seo";

function normalizeParam(value) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function buildCatalogDescription(route, search) {
  if (search) {
    return `Browse Velora search results for ${search} within the ${route.label.toLowerCase()} collection.`;
  }

  return route.description;
}

export function generateMetadata({ params, searchParams }) {
  const route = getCatalogRoute(params?.slug);

  if (!route) {
    return buildNoIndexMetadata({
      title: "Collection not found",
      description: "The requested Velora collection could not be found.",
      path: "/products",
    });
  }

  const search = normalizeParam(searchParams?.search).trim();
  const hasQueryFilters =
    Boolean(normalizeParam(searchParams?.search).trim()) ||
    Boolean(normalizeParam(searchParams?.new).trim()) ||
    Boolean(normalizeParam(searchParams?.category).trim()) ||
    Boolean(normalizeParam(searchParams?.subCategory).trim());

  return buildPageMetadata({
    title: search ? `Search results for "${search}"` : route.title,
    description: buildCatalogDescription(route, search),
    path: route.path,
    noIndex: hasQueryFilters,
    keywords: search ? [search, ...route.keywords] : route.keywords,
  });
}

export default async function CategoryPage({ params, searchParams }) {
  const route = getCatalogRoute(params?.slug);

  if (!route) {
    notFound();
  }

  const search = normalizeParam(searchParams?.search).trim();
  const filters = getCatalogFilters(params?.slug);
  const products = await getProducts({
    ...filters,
    search: search || undefined,
  }).catch(() => []);

  const title = search ? `Search results for "${search}"` : route.title;
  const description = buildCatalogDescription(route, search);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: route.label, path: route.path },
          ]),
          buildCollectionPageSchema({
            title,
            description,
            path: route.path,
            products,
          }),
        ]}
      />
      <CatalogPage
        initialState={{
          ...filters,
          search,
          category: filters.category || "",
          subCategory: filters.subCategory || "",
          isNew: Boolean(filters.isNew),
        }}
      />
    </>
  );
}
