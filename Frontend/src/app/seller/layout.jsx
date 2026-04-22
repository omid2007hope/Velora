import SiteShell from "@/app/components/layout/SiteShell";
import SellerPanelGuard from "@/app/features/seller/components/SellerPanelGuard";
import SellerPanelShell from "@/app/features/seller/components/SellerPanelShell";

export default function SellerLayout({ children }) {
  return (
    <SiteShell>
      <SellerPanelGuard>
        <SellerPanelShell>{children}</SellerPanelShell>
      </SellerPanelGuard>
    </SiteShell>
  );
}
