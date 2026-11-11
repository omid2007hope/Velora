/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
