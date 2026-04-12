import { buildNoIndexMetadata } from "@/app/lib/seo";
import AccountAccessGuard from "@/app/components/account/AccountAccessGuard";

export const metadata = buildNoIndexMetadata({
  title: "Account",
  description: "Secure account pages for Velora customers.",
  path: "/account",
});

export default function AccountLayout({ children }) {
  return <AccountAccessGuard>{children}</AccountAccessGuard>;
}
