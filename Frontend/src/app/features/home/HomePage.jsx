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

import SiteShell from "@/app/components/layout/SiteShell";
import CategoryPreview from "@/app/features/home/components/CategoryPreview";
import DealsPreview from "@/app/features/home/components/DealsPreview";
import Promo from "@/app/features/home/components/Promo";
import SeoContent from "@/app/features/home/components/SeoContent";
import Service from "@/app/features/home/components/Service";
import WatchCollectionPreview from "@/app/features/home/components/WatchCollectionPreview";

export default function HomePage() {
  return (
    <SiteShell>
      <Promo />
      <CategoryPreview />
      <DealsPreview />
      <WatchCollectionPreview />
      <SeoContent />
      <Service />
    </SiteShell>
  );
}
