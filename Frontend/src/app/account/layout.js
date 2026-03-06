import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Account",
  description: "Secure account pages for Velora customers.",
  path: "/account",
});

export default function AccountLayout({ children }) {
  return children;
}
