import { buildNoIndexMetadata } from "@/app/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Reset password",
  description:
    "Private password reset confirmation pages for Velora customers.",
  path: "/reset-password",
});

export default function ResetPasswordLayout({ children }) {
  return children;
}
