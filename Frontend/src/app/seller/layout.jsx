import { buildNoIndexMetadata } from "@/app/lib/seo";
import SiteShell from "@/app/components/layout/SiteShell";
import SellerPanelGuard from "@/app/features/seller/components/SellerPanelGuard";
import SellerPanelShell from "@/app/features/seller/components/SellerPanelShell";

export const metadata = buildNoIndexMetadata({
  title: "Seller Dashboard – Manage Your Velora Store",
  description:
    "Access your Velora seller dashboard to manage product listings, track store performance, and grow your presence on the platform.",
  path: "/seller",
});

export default function SellerLayout({ children }) {
  return (
    <SiteShell>
      <SellerPanelGuard>
        <SellerPanelShell>{children}</SellerPanelShell>
      </SellerPanelGuard>
    </SiteShell>
  );
}
