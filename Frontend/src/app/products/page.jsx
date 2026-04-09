import CatalogPage from "@/features/catalog/CatalogPage";
import JsonLd from "@/components/seo/JsonLd";
import { getProducts } from "@/lib/server-api";
import {
  buildCatalogSeo,
  getProductsRouteState,
} from "@/features/catalog/utils/catalog-state";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPageMetadata,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const state = getProductsRouteState(searchParams);
  const products = await getProducts({
    category: state.category || undefined,
    subCategory: state.subCategory || undefined,
    isNew: state.isNew,
    search: state.search || undefined,
  }).catch(() => []);
  const seo = buildCatalogSeo(state, products.length);

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
  const products = await getProducts({
    category: state.category || undefined,
    subCategory: state.subCategory || undefined,
    isNew: state.isNew,
    search: state.search || undefined,
  }).catch(() => []);
  const seo = buildCatalogSeo(state, products.length);

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
      <CatalogPage initialState={state} />
    </>
  );
}
