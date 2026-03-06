import { getProducts } from "@/lib/server-api";
import { absoluteUrl } from "@/lib/site";

const catalogUrls = [
  "/products",
  "/products?new=true",
  "/products?category=Men",
  "/products?category=Women",
  "/products?category=Accessories",
  "/products?category=Watch",
];

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
    ...catalogUrls.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "daily",
      priority: path === "/products" ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product._id || product.id}`),
      lastModified: product.updatedAt || product.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
