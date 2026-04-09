import { notFound } from "next/navigation";
import ProductDetailClientPage from "@/features/product/ProductDetailPage";
import JsonLd from "@/components/seo/JsonLd";
import { getProductById, getReviewsByProductId } from "@/lib/server-api";
import {
  buildBreadcrumbSchema,
  buildNoIndexMetadata,
  buildPageMetadata,
  buildProductSchema,
  sanitizeDescription,
} from "@/lib/seo";

function buildProductDescription(product) {
  if (!product) {
    return "The requested Velora product could not be found.";
  }

  const price = product.newPrice ?? product.price;
  const parts = [product.description];

  if (product.category) {
    parts.push(`Category: ${product.category}.`);
  }

  if (Number.isFinite(price)) {
    parts.push(`Available now for $${price}.`);
  }

  return sanitizeDescription(parts.join(" "));
}

export async function generateMetadata({ params }) {
  const productId = params?.id;
  const result = await getProductById(productId).catch(() => ({
    product: null,
    notFound: false,
    unavailable: true,
  }));

  if (result.notFound) {
    return buildNoIndexMetadata({
      title: "Product not found",
      description: "The requested Velora product could not be found.",
      path: `/products/${productId}`,
    });
  }

  if (!result.product) {
    return buildPageMetadata({
      title: "Product details",
      description:
        "Explore product details, pricing, and availability from Velora.",
      path: `/products/${productId}`,
      keywords: ["product details"],
    });
  }

  const product = result.product;

  return buildPageMetadata({
    title: product.name,
    description: buildProductDescription(product),
    path: `/products/${productId}`,
    image: `/products/${productId}/opengraph-image`,
    keywords: [product.category, product.name],
  });
}

export default async function ProductDetailRoute({ params }) {
  const productId = params?.id;
  const result = await getProductById(productId).catch(() => ({
    product: null,
    notFound: false,
  }));

  if (result.notFound) {
    notFound();
  }

  const product = result.product;
  const reviews = product
    ? await getReviewsByProductId(productId).catch(() => [])
    : [];

  return (
    <>
      <JsonLd
        data={
          product
            ? [
                buildBreadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/products" },
                  { name: product.name, path: `/products/${productId}` },
                ]),
                buildProductSchema({ product, reviews }),
              ]
            : null
        }
      />
      <ProductDetailClientPage productId={productId} />
    </>
  );
}
