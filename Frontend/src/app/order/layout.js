import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Checkout",
  description: "Secure checkout and order review pages for Velora customers.",
  path: "/order",
});

export default function OrderLayout({ children }) {
  return children;
}
