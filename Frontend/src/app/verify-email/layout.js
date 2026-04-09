import { buildNoIndexMetadata } from "@/app/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Verify email",
  description: "Private email verification pages for Velora customers.",
  path: "/verify-email",
});

export default function VerifyEmailLayout({ children }) {
  return children;
}
