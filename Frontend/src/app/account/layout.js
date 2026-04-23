import { buildNoIndexMetadata } from "@/app/lib/seo";
import AccountAccessGuard from "@/app/components/account/AccountAccessGuard";

export const metadata = buildNoIndexMetadata({
  title: "My Account – Profile & Settings",
  description:
    "Manage your Velora account profile, shipping addresses, and payment details. Keep your personal information up to date for a faster checkout experience.",
  path: "/account",
});

export default function AccountLayout({ children }) {
  return <AccountAccessGuard>{children}</AccountAccessGuard>;
}
