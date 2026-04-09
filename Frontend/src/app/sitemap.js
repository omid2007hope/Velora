import { getProducts } from "@/app/lib/server-api";
import { absoluteUrl } from "@/app/lib/site";
import { catalogRoutes } from "@/app/lib/catalog";

export default async function sitemap() {
  const now = new Date();
  const products = await getProducts().catch(() => []);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...catalogRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product._id || product.id}`),
      lastModified: product.updatedAt || product.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
