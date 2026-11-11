// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
